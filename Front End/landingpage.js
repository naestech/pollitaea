function LandingPage() {
	// Inferred flexbox from absolute Figma positioning
	// For best Bifrost generations, use Autolayout in Figma
	return (
		<div className="bg-white flex items-start pt-[326px] pr-[29px] pb-[349px] pl-12 h-fit font-extrabold text-black font-EBGaramond">
			<img
				src="/images/Landing Page/Ellipse-1.svg"
				alt="Ellipse 1"
				className="h-[169px] w-[313px]"
			/>
			<div className="right-3 bottom-[360px] absolute text-xl leading-[26px] h-[57px] w-[234px]">
				Knowledge is Power
			</div>
			<div className="right-[-40px] top-[386px] absolute text-[40px] leading-[52px] h-[57px] w-[234px]">
				Pollitaea
			</div>
			<img src="/images/Landing Page/US-Flag.svg" alt="US Flag" className="h-[97px] w-[138px]" />
			<img
				src="/images/Landing Page/Top-Stars.svg"
				alt="Top Stars"
				className="h-[165px] w-[208px]"
			/>
			<img
				src="/images/Landing Page/Bottom-Stars.svg"
				alt="Bottom Stars"
				className="h-[175px] w-[189px]"
			/>
		</div>
	);
}
export default LandingPage;
