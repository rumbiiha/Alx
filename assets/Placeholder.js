import React from 'react'
import { Svg, Rect, Path } from 'react-native-svg'

function Placeholder({ width, height }) {
    return (
        <Svg width={width} height={height} viewBox="0 0 1600 1600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect width={width} height={height} fill="#B8BEBE" fillOpacity="0.3" />
            <Path d="M760.949 1008V636.135L857.708 592V1008H760.949Z" fill="#7C8282" fillOpacity="0.4" />
            <Path d="M1115.24 797.646L1200 883.542L1193.09 890.623L1134.06 950.81L1127.19 943.81L1049.3 864.874L965.008 950.81L899.068 883.582L983.357 797.646L905.934 718.268L899.107 711.227L905.973 704.188L958.102 651.041L965.047 644L1049.3 730.418L1134.06 644L1200 711.227L1115.24 797.646Z" fill="#7C8282" fill-opacity="0.4" />
            <Path fillRule="evenodd" clipRule="evenodd" d="M605.238 654.441V667.435C587.204 659.349 567.277 654.802 546.323 654.802C465.506 654.843 400 721.588 400 803.983C400 886.379 465.506 953.164 546.323 953.164C567.277 953.164 587.204 948.618 605.238 940.531V955.175H701.998V654.441H605.238ZM605.238 807.202C603.581 838.905 577.852 864.131 546.323 864.131C514.793 864.131 487.328 837.215 487.328 803.983C487.328 770.752 513.727 743.837 546.323 743.837C578.918 743.837 603.581 769.062 605.238 800.764V807.202Z" fill="#7C8282" fill-opacity="0.4" />
        </Svg>
    )
}

export default Placeholder



