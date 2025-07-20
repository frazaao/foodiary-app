import { CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { CameraIcon, CheckIcon, Trash2Icon, XIcon } from "lucide-react-native";
import { useCallback, useRef, useState } from "react";
import { Image, Modal, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { Button } from "./button";

interface ICameraModalProps {
  open: boolean;
  onClose: () => void;
}

export const CameraModal: React.FC<ICameraModalProps> = ({
  onClose,
  open,
}: ICameraModalProps) => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView>(null);

  const handleCloseModal = useCallback(() => {
    onClose();
    setPhotoUri(null);
  }, []);

  const handleTakePicture = useCallback(async () => {
    if (!cameraRef.current) return;

    const { uri } = await cameraRef.current.takePictureAsync({
      imageType: "jpg",
    });

    setPhotoUri(uri);
  }, []);

  const handleDeletePhoto = useCallback(() => {
    setPhotoUri(null);
  }, []);

  if (!permission) return null;

  return (
    <Modal
      transparent
      statusBarTranslucent
      onRequestClose={handleCloseModal}
      visible={open}
      animationType="slide"
    >
      <StatusBar style="light" />

      <View className="bg-black flex-1">
        {!permission.granted && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-white text-center px-10 text-base font-sans-regular mb-4">
              Precisamos de permissão para acessar a câmera!
            </Text>
            <Button onPress={requestPermission}>Dar permissão</Button>
          </View>
        )}

        {permission.granted && (
          <SafeAreaProvider>
            <SafeAreaView className="flex-1">
              <View className="flex-row p-5">
                <Button size="icon" color="dark" onPress={handleCloseModal}>
                  <XIcon size={20} color={colors.gray[500]} />
                </Button>
              </View>

              {!photoUri && <CameraView ref={cameraRef} style={{ flex: 1 }} />}

              {photoUri && (
                <Image
                  source={{ uri: photoUri }}
                  className="flex-1"
                  resizeMode="contain"
                />
              )}

              {!photoUri && (
                <View className="p-5 pt-6 items-center gap-2 pb-12">
                  <View className="flex-row">
                    <Button
                      size="icon"
                      color="dark"
                      onPress={handleTakePicture}
                    >
                      <CameraIcon size={20} color={colors.lime[600]} />
                    </Button>
                  </View>

                  <Text className="text-gray-100 text-base font-sans-regular">
                    Tirar foto
                  </Text>
                </View>
              )}

              {photoUri && (
                <View className="p-5 pt-6 items-center gap-8 pb-12 flex-row justify-center">
                  <Button size="icon" color="dark" onPress={handleDeletePhoto}>
                    <Trash2Icon size={20} color={colors.gray[500]} />
                  </Button>
                  <Button size="icon">
                    <CheckIcon size={20} color={colors.black[700]} />
                  </Button>
                </View>
              )}
            </SafeAreaView>
          </SafeAreaProvider>
        )}
      </View>
    </Modal>
  );
};
