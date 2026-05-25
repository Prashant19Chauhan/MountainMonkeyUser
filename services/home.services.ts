import api from "@/lib/api";

export const homeHeroContent = async() => {
    try {
        const response = await api.get("/home/hero-section");
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const homeCuratedPackagesContent = async() => {
    try {
        const response = await api.get("/home/curated-packages");
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const homeTopDestinationsContent = async() => {
    try {
        const response = await api.get("/home/top-destinations");
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const homePopularActivitiesContent = async() => {
    try {
        const response = await api.get("/home/popular-activities");
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const homeUniqueStaysContent = async() => {
    try {
        const response = await api.get("/home/unique-stays");
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const homeUpcomingPackagesContent = async() => {
    try {
        const response = await api.get("/home/upcoming-packages");
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const homeAdvertisementsContent = async(placement: string) => {
    try {
        const response = await api.get(`/home/advertisements?placement=${placement}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const homeTravelerStoriesContent = async() => {
    try {
        const response = await api.get("/home/traveler-stories");
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const homeTestimonialsContent = async() => {
    try {
        const response = await api.get("/home/testimonials");
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

