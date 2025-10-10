import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  const user = {
    fullName: 'John Doe',
    mobileNumber: '+1234567890',
    email: 'johndoe@example.com',
    gender: 'Male',
    city: 'Thanjavur',
    carNo: 'NY1234',
    carName: 'Toyota Corolla',
    profilePicture: 'https://images.pexels.com/photos/7540485/pexels-photo-7540485.jpeg',
    bankAccountDetails: 'State Bank of India - ****1234',
    drivingLicence: 'D1234567890',
    isVerified: true,
    regiStatus: 'Active',
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView className="p-4">
        <View className="items-center mt-10 mb-6">
          <Image
            source={{ uri: user.profilePicture }}
            className="w-24 h-24 mb-4 border-4 rounded-full border-primary"
          />
          <Text className="text-4xl text-primary font-interSemiBold"> Welcome! {user.fullName}</Text>
        </View>

        <View className="p-4 space-y-3 bg-gray-100 rounded-lg">
          <Text className="mb-2 text-xl font-interSemiBold text-primary">Account Details</Text>
          <View className="flex-row justify-between">
            <Text className="text-lg text-gray-900 font-interRegular">Mobile Number:</Text>
            <Text className="text-lg text-gray-900 font-interRegular ">{user.mobileNumber}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg text-gray-900 font-interRegular">Gender:</Text>
            <Text className="text-lg text-gray-900 font-interRegular ">{user.gender}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg text-gray-900 font-interRegular">City:</Text>
            <Text className="text-lg text-gray-900 font-interRegular ">{user.city}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg text-gray-900 font-interRegular">Verification:</Text>
            <Text className="text-lg text-gray-900 font-interRegular ">{user.isVerified ? 'Verified' : 'Not Verified'}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg text-gray-900 font-interRegular">Registration Status:</Text>
            <Text className="text-lg text-gray-900 font-interRegular ">{user.regiStatus}</Text>
          </View>
        </View>

        <View className="p-4 mt-6 space-y-3 bg-gray-100 rounded-lg">
          <Text className="mb-2 text-xl font-interSemiBold text-primary">Vehicle Details</Text>
          <View className="flex-row justify-between">
            <Text className="text-lg text-gray-900 font-interRegular">Car Name:</Text>
            <Text className="text-lg text-gray-900 font-interRegular">{user.carName}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg text-gray-900 font-interRegular">Car Number:</Text>
            <Text className="text-lg text-gray-900 font-interRegular">{user.carNo}</Text>
          </View>
        </View>

        <View className="p-4 mt-6 space-y-3 bg-gray-100 rounded-lg">
          <Text className="mb-2 text-xl font-interSemiBold text-primary">Documents</Text>
          <View className="flex-row justify-between">
            <Text className="text-lg text-gray-900 font-interRegular">Bank Account:</Text>
            <Text className="text-lg text-gray-900 font-interRegular">{user.bankAccountDetails}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-lg text-gray-900 font-interRegular">Driving Licence:</Text>
            <Text className="text-lg text-gray-900 font-interRegular">{user.drivingLicence}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
