import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser, logoutUser } from "../services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginSchema, LoginType, SignupFormSchema, SignupFormType } from "../lib/validations/auth.validation";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setAuth, logout as logoutAction } from "../store/userSlice";
import { 
  setCurrentStep, 
  setSignupData, 
  toggleTravelType, 
  resetSignup 
} from "../store/signupSlice";

// ==========================================
// 1. LOGIN STATE & HOOK
// ==========================================

export const useLogin = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [formData, setFormData] = useState<LoginType>({
        email:"",
        password:"",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    const {isPending, mutateAsync: handleLogin} = useMutation({
        mutationFn: (credentials: LoginType) => loginUser(credentials),
        onSuccess: (data) => {
            dispatch(setAuth({ token: data?.data?.accessToken || data?.accessToken, user: data?.data?.user || data?.user }));
            toast.success("Login successful");
            router.push("/");
        },
        onError: (error: any) => {
            toast.error(error.message || "Login failed");
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const parse = loginSchema.safeParse(formData);
        if(parse.success){
            handleLogin(parse.data);
        }
        else{
            toast.error(parse.error?.issues[0].message || "Invalid credentials");
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        isPending
    };
};

// ==========================================
// 2. SIGN-UP HOOK (Redux-Powered Form Stepper)
// ==========================================

export const useSignup = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const currentStep = useAppSelector(state => state.signup.currentStep);
  const signupData = useAppSelector(state => state.signup.signupData);

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setSignupData({ [name]: value }));
  };

  const handleToggleTravelType = (type: string) => {
    dispatch(toggleTravelType(type));
  };

  const { mutateAsync: handleSignup, isPending: isSignupPending } = useMutation({
    mutationFn: (credentials: SignupFormType) => registerUser(credentials),
    onSuccess: (data) => {
      toast.success("Account created successfully! Redirecting...");
      dispatch(setAuth({ token: data?.data?.accessToken || data?.accessToken, user: data?.data?.user || data?.user }));
      dispatch(resetSignup());
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.message || "Registration failed");
    },
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 5) {
      dispatch(setCurrentStep(currentStep + 1));
    } else {
      // Prepare data to send to backend
      const submitData = {
        ...signupData,
        countriesVisited: typeof signupData.countriesVisited === 'string' 
          ? signupData.countriesVisited.split(',').map(s => s.trim()).filter(s => s !== '') 
          : [],
        dreamDestination: typeof signupData.dreamDestination === 'string' 
          ? signupData.dreamDestination.split(',').map(s => s.trim()).filter(s => s !== '') 
          : [],
        adventureLevel: Number(signupData.adventureLevel),
        isProfileCompleted: true,
        isVerified: false,
        isBlocked: false,
        isDeleted: false,
        role: 'user'
      };
      const parse = SignupFormSchema.safeParse(submitData);
      if (parse.success) {
        handleSignup(parse.data as any);
      } else {
        toast.error(parse.error?.issues[0]?.message || "Please fill in all required fields");
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  return {
    currentStep,
    signupData,
    handleSignupChange,
    toggleTravelType: handleToggleTravelType,
    handleNext,
    handleBack,
    isSignupPending,
  };
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { mutateAsync: handleLogout, isPending: isLogoutPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(logoutAction());
      toast.success("Logged out successfully");
      router.push("/login");
    },
    onError: (error: any) => {
      console.error("Server logout failed:", error);
      dispatch(logoutAction());
      toast.success("Logged out");
      router.push("/login");
    },
  });

  return {
    handleLogout,
    isLogoutPending,
  };
};
