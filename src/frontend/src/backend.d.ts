import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MCQ {
    id: bigint;
    correctOption: string;
    question: string;
    explanation: string;
    systemId: bigint;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
}
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    isPublished: boolean;
    publishedDate: Time;
    slug: string;
    author: string;
}
export type Time = bigint;
export interface BodySystem {
    id: bigint;
    functionText: string;
    name: string;
    slug: string;
    description: string;
    neetPoints: string;
    commonDisorders: string;
    diagramUrl?: string;
    structureText: string;
}
export interface Contact {
    id: bigint;
    name: string;
    submittedAt: Time;
    email: string;
    message: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBlogPost(title: string, slug: string, content: string, author: string, isPublished: boolean): Promise<void>;
    createBodySystem(name: string, slug: string, description: string, structureText: string, functionText: string, neetPoints: string, commonDisorders: string, diagramUrl: string | null): Promise<void>;
    createMCQ(systemId: bigint, question: string, optionA: string, optionB: string, optionC: string, optionD: string, correctOption: string, explanation: string): Promise<void>;
    deleteBlogPost(id: bigint): Promise<void>;
    deleteBodySystem(id: bigint): Promise<void>;
    deleteMCQ(id: bigint): Promise<void>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllBodySystems(): Promise<Array<BodySystem>>;
    getAllContacts(): Promise<Array<Contact>>;
    getAllMCQs(): Promise<Array<MCQ>>;
    getBodySystemsByDisorder(): Promise<Array<BodySystem>>;
    getBodySystemsByFunction(): Promise<Array<BodySystem>>;
    getBodySystemsByStructure(): Promise<Array<BodySystem>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContact(name: string, email: string, message: string): Promise<void>;
    updateBlogPost(id: bigint, title: string, slug: string, content: string, author: string, isPublished: boolean): Promise<void>;
    updateBodySystem(id: bigint, name: string, slug: string, description: string, structureText: string, functionText: string, neetPoints: string, commonDisorders: string, diagramUrl: string | null): Promise<void>;
    updateMCQ(id: bigint, systemId: bigint, question: string, optionA: string, optionB: string, optionC: string, optionD: string, correctOption: string, explanation: string): Promise<void>;
}
