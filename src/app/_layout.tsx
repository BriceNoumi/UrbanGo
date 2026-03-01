import {Tabs} from "expo-router";
import Octicons from '@expo/vector-icons/Octicons';
import {appColors} from "@/src/theme/appColors";

export default function RootLayout(){
    return(
        <Tabs
            screenOptions={{
                tabBarActiveTintColor : appColors.primaryDark,
                headerStyle: {backgroundColor : appColors.primary, },
                headerTintColor: appColors.background,
                headerShadowVisible : false
            }}
            // backBehavior="order"
            initialRouteName = "(timeTables)"
        >
            <Tabs.Screen name = "(home)/index" options={{title : "Home", headerShown : false, tabBarIcon: ({color, size}) =>
                    (<Octicons name= "home" size={size} color={color}/>)
            }}>
            </Tabs.Screen><Tabs.Screen name = "(timeTables)" options={{title : "TimeTables", headerShown : true, tabBarIcon: ({color, size}) =>
                    (<Octicons name= "clock" size={size} color={color}/>)
            }}>
            </Tabs.Screen><Tabs.Screen name = "(ticket)/index" options={{title : "Ticket", headerShown : true, tabBarIcon: ({color, size}) =>
                    (<Octicons name= "credit-card" size={size} color={color}/>)
            }}>
            </Tabs.Screen><Tabs.Screen name = "(trafficInfo)/index" options={{title : "Traffic Info", headerShown : false, tabBarIcon: ({color, size}) =>
                    (<Octicons name= "alert" size={size} color={color}/>)
            }}>
            </Tabs.Screen><Tabs.Screen name = "(menu)/index" options={{title : "Menu", headerShown : false, tabBarIcon: ({color, size}) =>
                    (<Octicons name= "three-bars" size={size} color={color}/>)
            }}>
            </Tabs.Screen>
        </Tabs>
    )
}