<template>
    <z-paging ref="paging" v-model="dataList" @query="queryList">
    	<!-- z-paging默认铺满全屏，此时页面所有view都应放在z-paging标签内，否则会被盖住 -->
    	<!-- 需要固定在页面顶部的view请通过slot="top"插入，包括自定义的导航栏 -->
				<!-- <uni-list v-for="(item,index) in dataList" :key="index">
					<uni-list-item :title=item.moduleName :note=item.title :rightText=item.cityName link  @click="onClick(item)"></uni-list-item>
				</uni-list> -->
				<uni-list>
					<!-- to 属性携带参数跳转详情页面，当前只为参考 -->
					<uni-list-item direction="column" v-for="item in dataList" :key="item.id" 
					:to="'/pages/index/detail?title='+item.title+'&moduleName='+item.moduleName+'&cityName='+item.cityName+'&postAt='+item.postAt
					+'&level='+item.level+'&viewTotal='+item.viewTotal+'&qq='+item.qq+'&qqNickname='+item.qqNickname">
						<!-- 通过header插槽定义列表的标题 -->
						<template v-slot:header>
							<view class="uni-title">{{item.moduleName}}</view>
						</template>
						<!-- 通过body插槽定义列表内容显示 -->
						<template v-slot:body>
							<view class="uni-list-box">
								<view class="uni-content">
									<view class="uni-title-sub uni-ellipsis-2">{{item.title}}</view>
									<view class="uni-note">{{'地点: ' + item.cityName + '    发布时间: '+item.postAt}}</view>
								</view>
							</view>
						</template>
						<!-- 同步footer插槽定义列表底部的显示效果 -->
						<template v-slot:footer>
							<view class="uni-footer">
								<text class="uni-footer-text">{{'年限: ' + item.level}}</text>
								<text class="uni-footer-text">{{'语言: ' + item.language}}</text>
								<text class="uni-footer-text">{{'阅读: ' + item.viewTotal}}</text>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
    </z-paging>
</template>

<script setup>
    import { ref } from 'vue';
    const paging = ref(null)
	// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可
    let dataList = ref([])
	// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.reload()即可
    const queryList = (page, pageSize) => {
		// 此处请求仅为演示，请替换为自己项目中的请求
			uni.$ajax("/jobs/test",{ page,pageSize }).then(res => {
					paging.value.complete(res.data.result.records);
			})
    }
		
		const onClick = (item) => {
			console.log(item);
			uni.navigateTo({
				url: `/pages/index/detail?title=${item.title}&module=${item.moduleName}&city=${item.cityName}
				&level=${item.level}&language=${item.language}&qq=${item.qq}`
				// url: `/pages/index/test/test?title=${item.title}&level=${item.level}`
			});
		}
		
</script>

<style lang="scss">
	@import '@/common/uni-ui.scss';

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.tips {
		color: #67c23a;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		background-color: #f0f9eb;
		height: 0;
		opacity: 0;
		transform: translateY(-100%);
		transition: all 0.3s;
	}

	.tips-ani {
		transform: translateY(0);
		height: 40px;
		opacity: 1;
	}

	.content {
		width: 100%;
		display: flex;
	}

	.list-picture {
		width: 100%;
		height: 145px;
	}

	.thumb-image {
		width: 100%;
		height: 100%;
	}

	.ellipsis {
		display: flex;
		overflow: hidden;
	}

	.uni-ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.uni-ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>