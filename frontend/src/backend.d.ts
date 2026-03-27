import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StudentProfile {
    preferredRegion: PreferredRegion;
    stream: Stream;
    interests: Array<Interest>;
    preferredCollegeType: CollegeType;
    budgetMax: bigint;
    budgetMin: bigint;
    percentage: number;
}
export interface College {
    id: bigint;
    applicationDeadline: bigint;
    latitude: number;
    stream: Stream;
    country: string;
    rankingNational: bigint;
    annualFees: bigint;
    city: string;
    name: string;
    collegeType: CollegeType;
    rankingGlobal: bigint;
    longitude: number;
    eligibilityCriteria: number;
    coursesOffered: Array<string>;
    admissionRequirements: Array<string>;
}
export interface CollegeRecommendationScore {
    matchScore: bigint;
    college: College;
}
export interface ChatMessage {
    role: Variant_bot_user;
    text: string;
    timestamp: bigint;
}
export enum CollegeType {
    deemed = "deemed",
    private_ = "private",
    government = "government"
}
export enum Interest {
    law = "law",
    arts = "arts",
    medicine = "medicine",
    engineering = "engineering",
    management = "management"
}
export enum PreferredRegion {
    uk = "uk",
    usa = "usa",
    australia = "australia",
    other = "other",
    canada = "canada",
    india = "india"
}
export enum Stream {
    arts = "arts",
    commerce = "commerce",
    science = "science"
}
export enum Variant_bot_user {
    bot = "bot",
    user = "user"
}
export interface backendInterface {
    addCollege(college: College): Promise<void>;
    addStudentProfile(profile: StudentProfile): Promise<void>;
    askChatBot(question: string): Promise<ChatMessage>;
    compareColleges(collegeIds: Array<bigint>): Promise<Array<College>>;
    getColleges(): Promise<Array<College>>;
    getRecommendations(): Promise<Array<CollegeRecommendationScore>>;
}
