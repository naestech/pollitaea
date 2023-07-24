function SignIn() {
	// Inferred flexbox from absolute Figma positioning
	// For best Bifrost generations, use Autolayout in Figma
	return (
		<div className="bg-white flex items-start pt-[664px] pr-[67px] pb-[154px] pl-[70px] h-fit">
			<img
				src="/images/Sign In/Bottom-Stars.svg"
				alt="Bottom Stars"
				className="h-[175px] w-[189px]"
			/>
			<div className="text-xl leading-[26px] font-medium text-black font-EBGaramond">
				Don’t have an account? <span className="text-[#3c528e]">Sign Up</span>
			</div>
			<div>
				{/* This frame above (node Password) does not use autolayout - it may display incorrectly */}
				<div className="bg-[#d9d9d9] rounded-[10px] h-[59px] w-[333px]" />
				<div className="text-xl leading-[26px] font-medium text-black font-EBGaramond h-[26px] w-[154px]">
					Password
				</div>
			</div>
			<div>
				{/* This frame above (node Email) does not use autolayout - it may display incorrectly */}
				<div className="bg-[#d9d9d9] rounded-[10px] h-[59px] w-[333px]" />
				<div className="text-xl leading-[26px] font-medium text-black font-EBGaramond h-[26px] w-[154px]">
					Email
				</div>
			</div>
			<div>
				{/* This frame above (node Pollitaea Logo) does not use autolayout - it may display incorrectly */}
				<img src="/images/Sign In/US-Flag.svg" alt="US Flag" className="h-[96px] w-[146px]" />
				<div className="text-[40px] leading-[52px] font-extrabold text-black font-EBGaramond h-[57px] w-[248px]">
					Pollitaea
				</div>
				<div className="text-xl leading-[26px] font-extrabold text-black font-EBGaramond h-14 w-[247px]">
					Knowledge is Power
				</div>
			</div>
			<img src="/images/Sign In/Top-Stars.svg" alt="Top Stars" className="h-[165px] w-[208px]" />
			<div>
				{/* This frame above (node Log In) does not use autolayout - it may display incorrectly */}
				<div className="bg-[#d9d9d9] rounded-[10px] h-[45px] w-[145px]" />
				<div className="text-xl leading-[26px] font-medium text-black font-EBGaramond">Log In</div>
			</div>
			<div>
				{/* This frame above (node Sign in with) does not use autolayout - it may display incorrectly */}
				<img
					className="object-cover h-[60px] w-[55px]"
					alt="image 3"
					src="/images/Sign In/image-3.png"
				/>
				<img
					className="object-cover h-[55px] w-[55px]"
					alt="image 4"
					src="/images/Sign In/image-4.png"
				/>
				<div className="text-xl leading-[26px] font-medium text-black font-EBGaramond">
					Sign in with:
				</div>
			</div>
		</div>
	);
}
export default SignIn;
