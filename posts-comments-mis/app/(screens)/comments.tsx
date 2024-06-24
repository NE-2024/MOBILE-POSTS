import usePosts from "@/hooks/usePosts";
import { View } from "@/components/View";
import { Text } from "@/components/Text";
import { ActivityIndicator, Image, ScrollView, TouchableOpacity } from "react-native";
import ProfileAvatar from "@/assets/images/profile.jpg";
import { Entypo } from "@expo/vector-icons";
import { useGoBack } from "@/hooks/useGoBack";

export default function CommentsPage() {
  const { gettingComments, comments } = usePosts();
  const goBack = useGoBack();

  return (
    <View className="h-screen w-full px-4 rounded-xl py-6">
      <View className="flex flex-row py-6 gap-x-8">
      <TouchableOpacity onPress={() => goBack()}>
        <Entypo name="chevron-thin-left" size={20} style={{paddingTop:8}} color="black" className="" />
      </TouchableOpacity>
      <View>
        <Text className="text-2xl font-bold">
          Comments on this post
        </Text>
      </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {comments?.map((comment,index) => (
          <View key={index} className="border-[0.5px] border-[#b1b1b1] py-4 px-4 mt-4 rounded-sm">
            <View className="flex-row items-center mt-2">
              <Image source={ProfileAvatar} className="h-10 w-10" />
              <Text className="">{comment.email}</Text>
            </View>
            <View className="pl-10">
              <Text className="text-md font-bold py-4">{comment.name}</Text>
              <View className="border-l-[0.5px]">
                <Text className="pl-4">{comment.body}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      { gettingComments === true && (
      <View className="h-screen w-full items-center justify-center">
      <ActivityIndicator size="large" color="#581845" className='h-20 w-10'/>
      <Text className="text-center text-gray-500 py-4">Wait a moment please...</Text>
  </View>
    )}
    </View>
  );
}
