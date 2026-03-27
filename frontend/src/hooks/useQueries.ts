import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { StudentProfile, College, CollegeRecommendationScore, ChatMessage } from '../backend';

export function useGetColleges() {
  const { actor, isFetching } = useActor();
  return useQuery<College[]>({
    queryKey: ['colleges'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getColleges();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetRecommendations() {
  const { actor, isFetching } = useActor();
  return useQuery<CollegeRecommendationScore[]>({
    queryKey: ['recommendations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecommendations();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useAddStudentProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: StudentProfile) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addStudentProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    },
  });
}

export function useCompareColleges(collegeIds: bigint[]) {
  const { actor, isFetching } = useActor();
  return useQuery<College[]>({
    queryKey: ['compare', collegeIds.map(String).join(',')],
    queryFn: async () => {
      if (!actor || collegeIds.length < 2) return [];
      return actor.compareColleges(collegeIds);
    },
    enabled: !!actor && !isFetching && collegeIds.length >= 2,
  });
}

export function useAskChatBot() {
  const { actor } = useActor();
  return useMutation<ChatMessage, Error, string>({
    mutationFn: async (question: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.askChatBot(question);
    },
  });
}
