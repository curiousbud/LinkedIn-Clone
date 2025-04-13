import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import AboutSection from "../components/AboutSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const { username } = useParams();
    const queryClient = useQueryClient();

    // Fixed authUser query with queryFn
    const { data: authUser, isLoading } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            const response = await axiosInstance.get("/auth/me");
            return response.data;
        }
    });

    const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
        queryKey: ["userProfile", username],
        queryFn: () => axiosInstance.get(`/users/${username}`),
    });

    const { mutate: updateProfile } = useMutation({
        mutationFn: async (updatedData) => {
            await axiosInstance.put(`/users/${username}`, updatedData);
        },
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries(["userProfile", username]);
            queryClient.invalidateQueries(["authUser"]); // Also invalidate auth user data
        },
    });

    if (isLoading || isUserProfileLoading) return null;

    const isOwnProfile = authUser?.username === userProfile?.data?.username;
    const userData = isOwnProfile ? authUser : userProfile?.data;

    const handleSave = (updatedData) => {
        updateProfile(updatedData);
    };

    return (
        <div className='max-w-4xl mx-auto p-4'>
            <ProfileHeader userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <ExperienceSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <EducationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
            <SkillsSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
        </div>
    );
};

export default ProfilePage;