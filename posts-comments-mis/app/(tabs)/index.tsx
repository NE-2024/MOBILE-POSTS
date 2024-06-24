import { Text } from "@/components/Text";
import { View } from "@/components/View";
import CustomButton from "@/components/form/customButton";
import CustomInput from "@/components/form/customInput";
import usePosts from "@/hooks/usePosts";
import { useState } from "react";
import { Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import Logo from "@/assets/images/logo.png"
import { useToast } from "react-native-toast-notifications";
// Dismiss keyboard when user taps outside of the input field
const DismissKeyboard = ({ children }: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function HomeScreen() {
  const toast = useToast();
  const {createPost, creatingPost} = usePosts();
  const [data, setData] = useState({
    title: "",
    body: "",
    userId: Math.floor(Math.random() * 100)
  });
  
  const handleSubmit = () => {
    if(!data.title || !data.body) {
      return toast.show("Please fill in all fields", {
        type: 'danger'
    });
  }
    if(data.title.length < 5) {
      return toast.show("Title must be at least 5 characters", {
        type: 'danger'
    });
    }
    createPost(data, true);
 
  
  };

  return (
    <DismissKeyboard>
   <View className="flex-1 justify-center items-center w-full px-6">
    <View className="">
      <Image source={Logo} className="h-20 w-64" resizeMode="contain"	/>
    </View>
    <View className="py-4">
      <Text className="text-center font-bold text-2xl pt-8">Create a post</Text>
      <View className="py-4">
      <Text>Please add the post title,then add its description</Text>
      <Text className="text-center">Help others to learn from your work</Text>
      </View>
    </View>
     <View className="w-full">
     <CustomInput label="Title" value={data.title} onChangeText={(val:string) => setData({...data, title: val})}/>
     <CustomInput label="Description" number={6} value={data.body} onChangeText={(val:string)=> setData({...data, body: val})}  />
     
     </View>
     <View className="w-full py-8">
     <CustomButton  buttonText="Create Post" isLoading={creatingPost} onPress={handleSubmit} />
     </View>
   </View>
   </DismissKeyboard>

  );
}

