import { useState } from 'react';
import { Text, ScrollView, View, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    if (form.password.length < 8 || form.password.length > 265) {
      Alert.alert('Error', 'Password must be between 8 and 265 characters long.');
      return;
    }

    setSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);

      // TODO: Set result to global state here if needed
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Image 
              source={images.logo} 
              resizeMode="contain" 
              className="w-[115px] h-[35px]"
            />

            <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">
              Sign up to Aora
            </Text>

            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-10"
            />

            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />
            <Text className="text-sm text-gray-400 mt-2">
              Password must be at least 8 characters long and not a commonly used password.
            </Text>

            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            />
            
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Have an account already? 
                <Link href="/sign-in" className="text-lg font-psemibold text-secondary"> Sign In</Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;