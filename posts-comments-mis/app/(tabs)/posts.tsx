
import usePosts from '@/hooks/usePosts';
import { View } from '@/components/View';
import { Text } from '@/components/Text';
import { ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import { postId } from '@/lib/atoms';
import { router } from 'expo-router';
import { useGoBack } from '@/hooks/useGoBack';
import NatureImage from "@/assets/images/nature.jpg"
import NatureImage2 from "@/assets/images/nature2.jpg"
import NatureImage3 from "@/assets/images/nature3.jpg"
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
        <View className='w-full'>
          <Image source={Math.floor(Math.random() * 3) === 0 ? NatureImage : Math.floor(Math.random() * 3) === 1 ? NatureImage2 : NatureImage3} className='w-full'/>
        </View>
         <Text className='text-lg font-bold pt-4'>{post.title}</Text>
         <Text className=''>{post.body}</Text>

         <View className='flex flex-row gap-x-4 mt-4 justify-end'>
         <TouchableOpacity className='bg-[#58184510] rounded-full p-3'>
         <FontAwesome6 name="thumbs-up" size={24} color="#581845" />   
          </TouchableOpacity>
           <TouchableOpacity onPress={()=> {
            setPostId(post.id)
            router.push("(screens)/comments")
           }} className='bg-[#58184510] rounded-full p-3'>
           <FontAwesome name="comments-o" size={24} color="#581845" />
           </TouchableOpacity>
           <TouchableOpacity onPress={()=> deletePost(post.id,true)} className='bg-[#58184510] rounded-full p-3'>
           <MaterialIcons name="delete-outline" size={24} color="#581845" />
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
