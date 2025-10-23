import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpCenter() {
  const faqs = [
    {
      question: 'How do I reset my password?',
      answer:
        'Go to your Profile → Account Settings → Change Password. You’ll receive an OTP to confirm the change.',
    },
    {
      question: 'How can I update my account details?',
      answer:
        'Navigate to Profile → Edit Account Details. You can update your name, mobile number, or address there.',
    },
    {
      question: 'I didn’t receive my OTP. What should I do?',
      answer:
        'Check your internet connection and make sure your number is correct. If the issue continues, contact support.',
    },
    {
      question: 'How do I contact customer support?',
      answer:
        'You can reach out to us via email at support@yourapp.com or through the in-app chat feature.',
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-5 py-6 bg-white">
      <Text className="mb-2 text-2xl font-bold">Help Center</Text>
      <Text className="mb-6 text-gray-500 text-md">Find answers to frequently asked questions or contact our support team for help.</Text>

      {faqs.map((item, index) => (
        <View key={index} className="p-5 mb-4 shadow-sm bg-gray-50 rounded-xl">
          <Text className="mb-1 text-lg font-semibold">{item.question}</Text>
          <Text className="text-base leading-5 text-gray-700">{item.answer}</Text>
        </View>
      ))}

      <View className="items-center p-7 bg-gray-50 rounded-2xl">
        <Ionicons name="chatbubbles-outline" size={40} color="#FFAC1C" />
        <Text className="mt-3 text-lg font-semibold">Still need help?</Text>
        <Text className="mt-1 text-sm text-center text-gray-500">Our support team is here to assist you 24/7.</Text>

        <TouchableOpacity className="px-8 py-3 mt-3 bg-primary rounded-xl" onPress={() => console.log("")}>
          <Text className="text-base font-semibold text-center text-white">Contact Support</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
