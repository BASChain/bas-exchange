<template scoped>
	<div class="container pt-3 pb-3">
		<div class="body-wrap agent-body-wrapper">
			<div class="container obil-wrapper">
				<div class="row align-items-center">
					<div class="bas-app-detail">
						<div class="row bas-app-header">
							<div class="bas-app-header--left">
								<img :src="iconUrl">
							</div>
							<div class="bas-app-header--right">
								<div class="bas-head-top">
									<div class="bas-head-top--left">
										<h1>{{ appName }}</h1>
										<div class="bas-min-p">
											<p>{{ appIntro }}</p>
											<p>{{ appIntro }}</p>
										</div>
									</div>
									<div class="bas-head-top--right">
										<div class="bas-download-button" style="background-position:bottom right;">
											<button v-for="butt in downloadButtons" :key="butt.hash" @click="DownloadExplorerHanle" class="bas-download-button--item">{{butt.info}}</button>
										</div>
									</div>
								</div>
								<div class="bas-head-line"></div>
								<div v-for="item in details" :key="item.hash" class="bas-head-fun">
									{{ item.osTitle }}
									<div v-for="min in item.osLabels" :key="min.hash" :class="item.styleType==='done'?'bas-done':''">{{ min }}</div>
								</div>
							</div>
						</div>
						<div class="row bas-app-img">
							<img v-for="img in imgUrls" :key="img.hash" :src="img">
						</div>
						<div v-for="appintro in intros" :key="appintro.hash" class="row bas-app-intro">
							<h1>{{ appintro.introTitle }}</h1>
							<p>{{ appintro.introInfo }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.bas-done {
	font-size:16px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(0,202,155,1);
	line-height:22px;
	letter-spacing:1px;
}
.bas-head-fun {
	display: flex;
	font-size:16px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(91,92,117,1);
	line-height:22px;
	letter-spacing:1px;
	padding-top: 12px;
	padding-left: 24px;
}
.bas-head-line {
	width: 85%;
	height: 1px;
	background: rgba(225, 229, 229, 1);
	margin-bottom: 3px;
	margin-left: 24px;
}
.bas-download-button {
	text-align: right;
	padding-top: 30px;
	padding-right: 100px;
}
.bas-download-button > button {
	width: auto;
	height:40px;
	font-size:18px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(255,255,255,1);
	background:rgba(0,202,155,1);
	line-height:25px;
	letter-spacing:1px;
	border: 0px;
	padding-top: 1px;
	border-radius:21px;
	text-align: center;
	margin: 6px;
	padding-right: 19px;
	padding-left: 19px;
	white-space:nowrap;
	text-overflow:ellipsis;
	overflow:hidden;
}
.bas-min-p > p {
	margin-bottom: 0px;
}
.bas-head-top--left > .bas-min-p {
	width:39px;
	height:22px;
	font-size:16px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(91,92,117,1);
	line-height:22px;
	letter-spacing:1px;
	padding-top: 30px;
	padding-left: 24px;
}
.bas-head-top--left > h1 {
	width:70px;
	height:30px;
	font-size:22px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(4,6,46,1);
	line-height:30px;
	letter-spacing:1px;
	padding-top: 45px;
	padding-left: 24px;
}
.bas-head-top--left {
	width: 50%;
	height: 144px;
	/* background: lightyellow; */
}
.bas-head-top--right {
	width: 50%;
	height: 144px;
	/* background: mediumpurple; */
	position: relative;
}
.bas-head-top {
	width: 100%;
	height: 144px;
	/* background: lightsalmon; */
	display: flex;
}
.bas-app-header--right {
	width: 88%;
	/* height: 248px; */
	/* background: lightcyan; */
}
.bas-app-header--left {
	width: 12%;
	/* height: 248px; */
	/* background: lightcoral; */
}
.bas-app-header--left > img {
	/* position: absolute; */
	/* display: block; */
	margin: 0 auto;
	width: 100%;
	padding-top: 65px;
}
.bas-app-header {
	width: 100%;
	height: 248px;
	/* background:darksalmon; */
	display: flex;
}
.bas-app-img {
	width: 100%;
	height: 402px;
	/* background:honeydew; */
	display: flex;
	margin-bottom: 43px;
}
.bas-app-img > img {
	margin-right: 26px;
	width: 226px;
	height: 402px;
}
.bas-app-intro > p {
	font-size:16px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight: 400;
	color:rgba(4,6,46,1);
	line-height:25px;
	letter-spacing:1px;
	/* word-break:break-all; */
}
.bas-app-intro > h1 {
	font-size:18px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(4,6,46,1);
	line-height:25px;
	letter-spacing:1px;
	margin-bottom: 0px;
}
.bas-app-intro {
	width: 100%;
	/* height: 290px; */
	/* background:lightcoral; */
	margin-bottom: 24px;
}
.bas-app-detail {
	width: 66%;
	height: 940px;
	height: auto;
	margin: 0 auto;
	/* background: lemonchiffon; */
}
.agent-body-wrapper {
	position: relative;
	padding: 100px auto auto auto;
	background: rgba(255,255,255,1);
	border: 1px solid rgba(245,246,246,1);
	width: 100%;
}
.obil-wrapper {
	position: relative;
	background: rgba(255,255,255,1);
	min-height: 940px;
}
.align-items-center {
	min-height: 940px;
	margin-bottom: 17px;

}
.row {
	display: -ms-flexbox;
	display: -webkit-box;
	/* display: flex; */
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
	margin-right: -15px;
	margin-left: -15px;
}
.body-wrap {
	min-height: 940px;
}
</style>
<script>

import {getDownloadAppsPath,MacBrowserApp,ExtChromeOffline} from '@/bizlib/apps'
export default {
	name:"AppStoreDetail",
	computed: {
		...Vuex.mapState({
		isCN:state => state.lang === 'zh-CN'
		})
	},
	data() {
		return {
			appName: "BPassword",
			appIntro: "intro",
			iconUrl: "/static/icons/BPassword.png",
			imgUrls: [
				'/static/img/pir-home.png',
				'/static/img/pir.png'
			],
			downloadButtons: [
				{
					id: 'mac',
					info: 'download BPassword for Iphone'
				},
				{
					id: 'android',
					info: 'download BPassword for Android'
				}
			],
			details: [
				{
					osTitle: "已开发的功能:",
					styleType: "done",
					osLabels:[
						'# 去中心化',
						'# 安全加密',
						'# 安全加密'
					]
				},
				{
					osTitle: "正在完善的功能:",
					styleType: "undo",
					osLabels:[
						'# 正在完善的功能',
						'# 正在完善的功能'
					]
				}
			],
			intros: [
				{
					introTitle: "Explore your creations in full screen.",
					introInfo: "Immerse yourself by using the vivid Retina displays of iPad or Mac. Simply tap the center divider, then drag to view your code or live project on the full screen. You can also customize built-in games like Battleship and Brick Breaker, then immerse yourself by letting them take up the whole screen."
				},
				{
					introTitle: "Explore your creations in full screen.",
					introInfo: "Immerse yourself by using the vivid Retina displays of iPad or Mac. Simply tap the center divider, then drag to view your code or live project on the full screen. You can also customize built-in games like Battleship and Brick Breaker, then immerse yourself by letting them take up the whole screen."
				}
			]
		}
	},
	methods: {
		DownloadExplorerHanle(){
      let fileType = this.os
      let url = getDownloadAppsPath(MacBrowserApp)
      console.log('>>>>>>',url)
      window.open(url)
    }
	}
}
</script>

<style>

</style>
