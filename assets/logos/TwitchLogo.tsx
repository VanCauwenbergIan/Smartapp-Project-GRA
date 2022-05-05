import * as React from 'react'
import Svg, { SvgProps, Defs, Pattern, Image, Path } from 'react-native-svg'

export default (props: SvgProps) => (
  <Svg
    // @ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={158}
    height={184}
    {...props}
  >
    <Defs>
      <Pattern
        id="a"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        viewBox="0 0 878 1024"
      >
        <Image
          // slight bit of trimming for unwanted lines at border (don't know what the reason behind them is, aren't there when displaying in a browser)
          width={878}
          height={1024}
          // @ts-ignore
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA24AAAQACAMAAACu1vrxAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABFFBMVEUAAAD/AP+RRv+SRf+RR/+RRv+RRv+sdP/u4//Yvv+2g//p2/+RRv+RRf+QRv+AgP+RRv+qVf+SRv+RRf/Rsf/awf+RRv/av/+RRv+RRv+SR//Yvv+RRf/YvP+SRv+RRv+RRv/Xu/+kZf/bwv/7+P/+/v/dxf/Fnv+RRv+SR//v5f///v+pb/+pbv+QRf+obv+RRv+lZ/+RRv/+/f+lZ/+RRv+RRf+SRv/u4/+aVf+RRv+QR/+RRf+QRv+PRP+QRv+RRv+PSP+SSf+RRv+RRv+OR/+SSf+PRP+RRv+OR/+SRv+SSf+RRv+SRf+PSP+RRv/////j0f+hYP+tdP/48//fyf+eXP/28P/t4f/Alf/Io//69//IakwOAAAAT3RSTlMAAZKTlJWZweLMwNuWl5gCoAOhosfN9sz3f37Lfct8+HvKxM33/c/C+Xfj/sHBesJ5w3j8xP5vbuHPbWxraiKR5zkcgOgrKinjJOIj4WAgbyt8UgAAAAFiS0dEUONuTLwAAAAHdElNRQfkBRgSLSwRHEImAAASi0lEQVR42u3aV9I0xRGG0fwQVjgBQngr4T0/3lsh4UY44fa/D27hgoAIhrcrs86zg8qqEz3TXVUdu7jsJPWLNgk32oQbbdJG3GgTbrRJ07hd/MWeCTfapFncaBNutEnTuNEm3GiTpnGjTbjRJk3jRptwo02axo024UabNI0bbcKNNmkaN9qEG23SNG60CTfapGncaBNutEnTuNEm3GiTpnGjTbjFtF1uc4QbbdIsbrQJN9qkadxoE260SdO40SbcaJOmcaNNuNEmTeNGm3CjTZrGjTbhRps0jRttwo02aRo32oQbbdI0brQJN9qkadxoE260SdO40SbcYtqusAvCjTZpFjfahBtt0jRutAk32qRp3GgTbrRJ07jRJtxok6Zxo0240SZN40abcKNNmsaNNuFGmzSNG23CjTZpGjfahBtt0jRutAm3mLYro2u76mrpDF3Tklv62fbX/0ln6NqO3OK/JHHTttzy/9tw067cDnhLgps25XbEO0nctCe3Q74A4KYtuR3zvQ037cjtoK/buGlDbkfdJcFN+3E77OYWbtqO23H3JHHTbtwOvJWMmzbjdnHdCTfhFuF2pDbctBe3Q7Xhpq24HasNN+3E7WBtuGkjbkdrw037cDtcG27ahtvx2nDTLtwW0IabNuG2gjbctAe3JbThpi24raENN+3AbRFtuGkDbqtow03zuS2jDTeN57aONtw0ndtC2nDTcG4racNNs7ktpQ03jea2ljbcNJnbYtpw02Buq2nDTXO5LacNN43ldnH9CTfhFuG2oDbcNJTbitpw00xuS2rDTSO5rakNN03ktqg23DSQ26racNM8bstqw03juK2rDTdN47awNtw0jNvK2nDTLG5La8NNo7itrQ03TeK2uDbcNIjb6tpw0xxuy2vDTWO4ra8NN03h1kAbbhrCrYM23DSDWwttuGkEtx7acNMEbk204aYB3Lpow039uV3ccMJNuEW49dGGm7pza6QNNzXn1kkbburNrZU23NSaWy9tuKkzt2bacFNjbt204aa+3Nppw01tufXThpu6cmuoDTc15dZRG27qye3Gv51wE24Rbj214aaO3Jpqw00NuXXVhpv6cWurDTe149ZXG27qxq2xNtzUjFtnbbipF7fW2nBTK269teGmTtyaa8NNjbh114ab+nBrrw03teHWXxtu6sJtgDbc1ITbBG24qQe3EdpwUwtuM7Thpg7chmjDTQ24TdGGm9bnNkYbblqe2xxtuGl1boO04abFuU3ShpvW5jZKG25amtssbbhpZW7DtOGmhblN04ab1uU2ThtuWpbbPG24aVVuA7XhpkW5TdSGm9bkNlIbblqS200jteGmFbnddPMJNynCbao23LQet7HacNNy3OZqw03LcbvlhJsU4nbCTcINN+GGm3DDDTfhhptww03CDTfhhptwww034YabcMNNwg034YabcMMNN+GGm3DDTcINN+GGm4Tblty++PJMfXXwQr4+10K+/Bo33P6kvjnXRP5/8EK+PdvefosbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGG2644YYbbrjhhhtuuOGGW5e++/5M/XDwQn4810K+/xE33DQy3HATbrgJN9wk3HATbrhJuOEm3HATbrhJuOEm3HCTcMNNuOEm3HDDTbjhJtxwk3DDTbjhJtxww0244SbccJNww0244SbccMNNuOEm3HCTcMNNuOEm3HDDTbjhJtxwk3DDTbjhJuGGm3DDTbjhJuGGm3DDTcINN+GGm3DDDTfhhptww03CDTfhhptwww034YabcMNNwg034YabcMMNN+GGm3DDTcINN+GGm3bu77jhplC3/gM33NROG25STBtuUkwbblJMG27Sr3fbebXhJsW04SbFtOEmxbThJsW04SbFtOEmxbThJsW04SbFtOEmxbThJsW04SbFtOEmxbThJv1S2+0n3HBTf224STFtuEkxbbhJMW24STFtuEkxbbhJMW24STFtuEkxbbhJMW24STFtuEkxbbhJMW24ibaYNtxE2wk33DROG26iDTfcNE/bHbiJtpg23ERbTBtuoi2mDTfRFtOGm2iLacNNe3bNEdpwE20xbbiJtpg23ERbTBtuoi2mDTfRFtOGm2iLacNNtMW04SbaYtpwE20xbbiJtpg23ERbTBtuoi2mDTfR9qd0Z+Em2g7Uhptoi2nDTbTFtOEm2mLacBNtMW24ibaYNtxEW0wbbqItpg030RbThptoi2nDTbO7ayVtuIm2mDbcRFtMG26iLaYNN9EW04abaItpw020xbThJtpi2nATbTFtuIm2mDbcRFtMG26iLaYNN9EW04abaPtD3V244UbbgtpwE20xbbiJtpg23ERbTBtuoi2mDTfRFtOGm2iLacNNtMW04SbaYtpwE20xbbiJtpg23ERbTBtuoi2mDTfRFtOGm2iLacNNtMW04SbaYtpwE20xbbiJtpg23ERbTBtuoi2mDTfRFtOGm2iLacNNbbunnTbcRNvv6d7CDTfaOmnDTbTFtOEm2mLacBNtMW24ibaYNtxEW0wbbqItpg030RbThptoi2nDTbTFtOEm2mLacFMrbfe11oabaItpw020xbThJtpi2nATbTFtuIm2mDbcRFtMG26iLaYNN9EW04abaItpw020xbThJtpi2nATbT/v/sINN9omaMNNtMW04SbaYtpwE20xbbiJtpg23ERbTBtuoi2mDTfRFtOGm2iLacNNtMW04aYle2CkNtxEW0wbbqKtcMONtnHacBNtuOFG2zxtk7k9+M8G/evYo/3Qw8tN5JFHk4fkscJtox4/VNsTT24+/uyzDbetudFWuOFG21BtuO3LjbbCDTfaxmrDbVdutBVuuKW0PbX54J8u3HCjbbI23LbkRlvhhhtts7XhtiE32go33Gibrg237bjRVrjhRtt8bbhtxo22wg032nbQhttW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"
        />
      </Pattern>
    </Defs>
    <Path
      data-name="878px-Twitch_Glitch_Logo_Purple.svg"
      fill="url(#a)"
      d="M0 0h159v185H0z"
    />
  </Svg>
)