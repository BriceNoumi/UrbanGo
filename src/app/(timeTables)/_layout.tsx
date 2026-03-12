import { createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {withLayoutContext} from "expo-router";
import {appColors} from "@/src/theme/appColors";

const {Navigator} = createMaterialTopTabNavigator();

export const TopTabs = withLayoutContext(Navigator);

export default function timeTablesLayout(){
    return(
        <TopTabs
            screenOptions = {{
                tabBarStyle : {
                    backgroundColor: appColors.primary,

                },
                tabBarLabelStyle : {
                    fontWeight : "bold",
                    fontSize : 13
                },

                tabBarActiveTintColor: appColors.background,


            }}
            initialRouteName="(lines)"
        >
            <TopTabs.Screen name = "favorites"  options={{ title : "Favorites"}}/>
            <TopTabs.Screen name = "(lines)"  options={{ title : "Lines"}}/>
            <TopTabs.Screen name = "(stops)"  options={{ title : "Stops"}}/>

        </TopTabs>
    )
}