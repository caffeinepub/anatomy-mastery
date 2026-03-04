import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  BlogPost,
  BodySystem,
  Contact,
  MCQ,
  UserRole,
} from "../backend.d.ts";
import { useActor } from "./useActor";

// ============ BODY SYSTEMS ============

export function useGetAllBodySystems() {
  const { actor, isFetching } = useActor();
  return useQuery<BodySystem[]>({
    queryKey: ["bodySystems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBodySystems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBodySystem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      slug: string;
      description: string;
      structureText: string;
      functionText: string;
      neetPoints: string;
      commonDisorders: string;
      diagramUrl: string | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createBodySystem(
        data.name,
        data.slug,
        data.description,
        data.structureText,
        data.functionText,
        data.neetPoints,
        data.commonDisorders,
        data.diagramUrl,
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["bodySystems"] }),
  });
}

export function useUpdateBodySystem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      slug: string;
      description: string;
      structureText: string;
      functionText: string;
      neetPoints: string;
      commonDisorders: string;
      diagramUrl: string | null;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateBodySystem(
        data.id,
        data.name,
        data.slug,
        data.description,
        data.structureText,
        data.functionText,
        data.neetPoints,
        data.commonDisorders,
        data.diagramUrl,
      );
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["bodySystems"] }),
  });
}

export function useDeleteBodySystem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteBodySystem(id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["bodySystems"] }),
  });
}

// ============ MCQs ============

export function useGetAllMCQs() {
  const { actor, isFetching } = useActor();
  return useQuery<MCQ[]>({
    queryKey: ["mcqs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMCQs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateMCQ() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      systemId: bigint;
      question: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctOption: string;
      explanation: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createMCQ(
        data.systemId,
        data.question,
        data.optionA,
        data.optionB,
        data.optionC,
        data.optionD,
        data.correctOption,
        data.explanation,
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mcqs"] }),
  });
}

export function useUpdateMCQ() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      systemId: bigint;
      question: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctOption: string;
      explanation: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateMCQ(
        data.id,
        data.systemId,
        data.question,
        data.optionA,
        data.optionB,
        data.optionC,
        data.optionD,
        data.correctOption,
        data.explanation,
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mcqs"] }),
  });
}

export function useDeleteMCQ() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteMCQ(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mcqs"] }),
  });
}

// ============ BLOG POSTS ============

export function useGetAllBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      slug: string;
      content: string;
      author: string;
      isPublished: boolean;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createBlogPost(
        data.title,
        data.slug,
        data.content,
        data.author,
        data.isPublished,
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useUpdateBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      slug: string;
      content: string;
      author: string;
      isPublished: boolean;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateBlogPost(
        data.id,
        data.title,
        data.slug,
        data.content,
        data.author,
        data.isPublished,
      );
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useDeleteBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteBlogPost(id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

// ============ CONTACTS ============

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.submitContact(data.name, data.email, data.message);
    },
  });
}

export function useGetAllContacts() {
  const { actor, isFetching } = useActor();
  return useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContacts();
    },
    enabled: !!actor && !isFetching,
  });
}

// ============ AUTH ============

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery<UserRole>({
    queryKey: ["userRole"],
    queryFn: async () => {
      if (!actor) return "guest" as UserRole;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}
