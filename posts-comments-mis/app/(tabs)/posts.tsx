
import usePosts from '@/hooks/usePosts';
import { View } from '@/components/View';
import { Text } from '@/components/Text';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import { postId } from '@/lib/atoms';
import { router } from 'expo-router';
import { useGoBack } from '@/hooks/useGoBack';

export default function PostsPage() {
  const { gettingPosts, availablePosts,deletePost, deletingPost} = usePosts();
  const [post_id, setPostId] = useRecoilState(postId);
  const goBack = useGoBack();
  return (
    <View className='px-4 rounded-xl py-6'>
          <View className="flex flex-row py-6 gap-x-8">
      <TouchableOpacity onPress={() => goBack()}>
        <Entypo name="chevron-thin-left" size={20} style={{paddingTop:8}} color="black" className="" />
      </TouchableOpacity>
      <View>
        <Text className="text-2xl font-bold">
          All Posts available
        </Text>
      </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      {availablePosts?.map((post,index) => (
       <View key={index} className='border-[0.5px] border-[#b1b1b1] py-4 px-4 mt-4 rounded-sm'>
         <Text className='text-lg font-bold'>{post.title}</Text>
         <Text className=''>{post.body}</Text>

         <View className='flex flex-row gap-x-4 mt-4 justify-end'>
           <TouchableOpacity onPress={()=> {
            setPostId(post.id)
            router.push("(screens)/comments")
           }}>
           <FontAwesome name="comments-o" size={24} color="black" />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> deletePost(post.id,true)}>
           <MaterialIcons name="delete-outline" size={24} color="black" />
           </TouchableOpacity>
         </View>
       </View>
      ))}
      </ScrollView>
      { gettingPosts === true && (
       <View className="h-screen w-full items-center justify-center">
       <ActivityIndicator size="large" color="#581845" className='h-20 w-10'/>
       <Text className="text-center text-gray-500 py-4">Wait a moment please...</Text>
   </View>
    )}
    </View>
  );
}
