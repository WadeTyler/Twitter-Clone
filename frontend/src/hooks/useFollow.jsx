import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useFollow = () => {
  const queryClient = useQueryClient();

  const {mutate:follow, isPending, error} = useMutation({
    mutationFn: async (userID) => {
      try {
        const res = await fetch(`/api/users/follow/${userID}`, {
          method: 'POST',
        });
        
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }

        return data;

      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries(['suggestedUsers']),
        queryClient.invalidateQueries(['authUser'])
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  return { follow, isPending };
}

export default useFollow;