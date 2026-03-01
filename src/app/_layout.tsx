import {Tabs} from "expo-router";
import {StatusBar} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Octicons from '@expo/vector-icons/Octicons';

export default function RootLayout(){
    return(
        <Tabs
            screenOptions={{ tabBarActiveTintColor : "teal"}}
            backBehavior="order">
            <Tabs.Screen name = "(home)/index" options={{title : "Home", headerShown : false, tabBarIcon: ({color, size}) =>
                    (<Octicons name= "home" size={size} color={color}/>)
            }}>
            </Tabs.Screen><Tabs.Screen name = "(timeTables)/index" options={{title : "TimeTables", headerShown : false, tabBarIcon: ({color, size}) =>
                    (<Octicons name= "clock" size={size} color={color}/>)
            }}>
            </Tabs.Screen><Tabs.Screen name = "(ticket)/index" options={{title : "Ticket", headerShown : false, tabBarIcon: ({color, size}) =>
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