import React from 'react'
import { Svg, Rect, Path } from 'react-native-svg'

function Timer({ size, primaryColor, color }) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width={size || "24"} height={size || "24"} viewBox="0 0 24 24" fill="none">
            <Path d="M2 22H13C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.36745 4 4.49744 7.50005 4 12" stroke={color || "#141B34"} stroke-width="1.5" stroke-linecap="round" />
            <Path d="M18.5 5.5L19.5 4.5M5.5 4.5L6.5 5.5" stroke={color || "#141B34"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path opacity="0.8" d="M16.5001 9.00003L13.5608 11.9394M13.5608 11.9394C13.2893 11.6679 12.9143 11.5 12.5001 11.5C11.6717 11.5 11.0001 12.1716 11.0001 13C11.0001 13.8285 11.6717 14.5 12.5001 14.5C13.3285 14.5 14.0001 13.8285 14.0001 13C14.0001 12.5858 13.8322 12.2108 13.5608 11.9394Z" stroke={primaryColor || "#141B34"} stroke-width="1.5" stroke-linecap="round" />
            <Path d="M12.5 3.5V2" stroke={color || "#141B34"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M10.5 2H14.5" stroke={color || "#141B34"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path opacity="0.8" d="M2 15H5" stroke={primaryColor || "#141B34"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M2 19H7" stroke={color || "#141B34"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    )
}

export default Timer;




