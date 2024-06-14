/**
 * @author 李偉志 <1212100741jerr823@gmail.com>
 */
import Image from "next/image";

export default function CustomCard({item}) {
    return(
        <div class="border">
             <div>{item.ScenicSpotName}</div>
        </div>
           
    )
}