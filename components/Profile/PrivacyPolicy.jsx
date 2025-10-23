import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyPolicy() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-5 py-6">
        <Text className="mb-4 text-2xl font-bold">Privacy Policy</Text>

        <Text className="mb-4 text-base text-gray-700">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our app.
        </Text>

        <Text className="mb-2 text-xl font-semibold">1. Information We Collect</Text>
        <Text className="mb-4 text-base text-gray-700">
          We may collect personal information such as your name, email address, phone number, and payment details when you register or use our services.
        </Text>

        <Text className="mb-2 text-xl font-semibold">2. How We Use Information</Text>
        <Text className="mb-4 text-base text-gray-700">
          The information collected is used to provide, maintain, and improve our services, communicate with you, and ensure account security.
        </Text>

        <Text className="mb-2 text-xl font-semibold">3. Data Sharing</Text>
        <Text className="mb-4 text-base text-gray-700">
          We do not sell your personal information. We may share data with trusted third-party service providers for operational purposes.
        </Text>

        <Text className="mb-2 text-xl font-semibold">4. Security</Text>
        <Text className="mb-4 text-base text-gray-700">
          We implement reasonable security measures to protect your information. However, no method of transmission over the internet is completely secure.
        </Text>

        <Text className="mb-2 text-xl font-semibold">5. Changes to This Policy</Text>
        <Text className="mb-4 text-base text-gray-700">
          We may update this Privacy Policy from time to time. Changes will be posted in the app, and your continued use constitutes acceptance.
        </Text>

       
      </ScrollView>
    </SafeAreaView>
  );
}
