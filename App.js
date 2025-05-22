import { HotUpdater } from "@hot-updater/react-native";
import { Text, View } from "react-native";

function App() {
  return (
    <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello Kishore</Text>
    </View>
  );
}

export default HotUpdater.wrap({ 
  source: "https://lhlhgeciiunwlrwvetnk.supabase.co/functions/v1/update-server", 
  requestHeaders: {
    // if you want to use the request headers, you can add them here
  },
  fallbackComponent: ({ progress, status }) => {
    console.log("Fallback component", progress, status);
    return (
      <View
      style={{
        flex: 1,
        padding: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* You can put a splash image here. */}

      <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        {status === "UPDATING" ? "Updating..." : "Checking for Update..."}
      </Text>
      {progress > 0 ? (
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          {Math.round(progress * 100)}%
        </Text>
      ) : null}
    </View>
    )
  },
})(App);
