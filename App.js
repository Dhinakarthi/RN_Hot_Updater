import { HotUpdater, useHotUpdaterStore } from "@hot-updater/react-native";
import { checkForUpdate } from "@hot-updater/react-native/dist/checkForUpdate";
import { useEffect, useState } from "react";
import { Button, Text, ToastAndroid, View } from "react-native";

const App = () => {
  const { progress, isBundleUpdated } = useHotUpdaterStore();

  const [bundle, setBundle] = useState({});

  useEffect(() => {

  }, []);

  const checkUpdate = async () => {
    try {
      const updateInfo = await HotUpdater.checkForUpdate({
        source: "https://lhlhgeciiunwlrwvetnk.supabase.co/functions/v1/update-server",
      });

      if (!updateInfo) {
        return {
          status: "UP_TO_DATE",
        };
      }

      ToastAndroid.show('Update Available', ToastAndroid.LONG);

      setBundle(updateInfo);
    } catch (error) {
      console.error("Failed to check for update:", error);
      return null;
    }
  }

  const updateBundle = async () => {
    // const result = await HotUpdater.runUpdateProcess({
    //   source: "https://lhlhgeciiunwlrwvetnk.supabase.co/functions/v1/update-server",
    //   reloadOnForceUpdate: true,
    // });

    if (bundle?.id && bundle?.fileUrl) {
      const result = await HotUpdater.updateBundle(bundle?.id, bundle?.fileUrl);
      ToastAndroid.show(result.message, ToastAndroid.LONG);
      ToastAndroid.show(result.status, ToastAndroid.LONG);
    }



  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello Sandhiya</Text>
      <Text>{!isBundleUpdated ? 'UP_TO_DATE' : 'UPDATE'}</Text>
      <Button
        title="Reload"
        onPress={() => HotUpdater.reload()}
      />
      <Button
        title="Check Update"
        onPress={() => checkUpdate()}
      />
      <Button
        title="Update"
        onPress={() => updateBundle()}
      />
    </View>
  );
}

export default App

// export default HotUpdater.wrap({ 
//   source: "https://lhlhgeciiunwlrwvetnk.supabase.co/functions/v1/update-server", 
//   requestHeaders: {
//     // if you want to use the request headers, you can add them here
//   },
//   fallbackComponent: ({ progress, status }) => {
//     console.log("Fallback component", progress, status);
//     return (
//       <View
//       style={{
//         flex: 1,
//         padding: 20,
//         borderRadius: 10,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//       }}
//     >
//       {/* You can put a splash image here. */}

//       <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
//         {status === "UPDATING" ? "Updating..." : "Checking for Update..."}
//       </Text>
//       {progress > 0 ? (
//         <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
//           {Math.round(progress * 100)}%
//         </Text>
//       ) : null}
//     </View>
//     )
//   },
// })(App);
