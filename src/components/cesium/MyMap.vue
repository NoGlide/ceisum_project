<template>
    <div id="cesiumContainer"></div>
</template>
<script>
import * as Cesium from 'cesium';

export default {
    name: 'cesiumContainer',
    data() {
        return {};
    },
    mounted() {
        var cesiumAsset =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZjIzNjBjYS1kMzg2LTQxNTUtYWI1My0zZWQxZDk0NjllMTgiLCJpZCI6NzkwMjIsImlhdCI6MTY0MTc4NjU5NX0.J8vmyth6-prCGWAk9KP7Muoi7oTgvaj_JFJqnAwHwnk';
        var tiandituTk = '796dc555444aa1a10e9859a43422c316';
        // 服务负载子域
        var subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];
        Cesium.Ion.defaultAccessToken = cesiumAsset;

        var viewer = new Cesium.Viewer('cesiumContainer', {
            animation: false, //动画
            homeButton: true, //home键
            geocoder: true, //地址编码
            baseLayerPicker: false, //图层选择控件
            timeline: false, //时间轴
            fullscreenButton: true, //全屏显示
            infoBox: true, //点击要素之后浮窗
            sceneModePicker: true, //投影方式  三维/二维
            navigationInstructionsInitiallyVisible: false, //导航指令
            navigationHelpButton: false, //帮助信息
            selectionIndicator: false, // 选择
            imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
                //影像底图
                url:
                    'http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=' +
                    tiandituTk,
                subdomains: subdomains,
                layer: 'tdtImgLayer',
                style: 'default',
                format: 'image/jpeg',
                tileMatrixSetID: 'GoogleMapsCompatible', //使用谷歌的瓦片切片方式
                show: true,
            }),
        });
        viewer._cesiumWidget._creditContainer.style.display = 'none'; // 隐藏cesium ion
        viewer.imageryLayers.addImageryProvider(
            new Cesium.WebMapTileServiceImageryProvider({
                //影像注记
                url:
                    'http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=' +
                    tiandituTk,
                subdomains: subdomains,
                layer: 'tdtCiaLayer',
                style: 'default',
                format: 'image/jpeg',
                tileMatrixSetID: 'GoogleMapsCompatible',
                show: true,
            })
        );

        // 将三维球定位到中国
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
            orientation: {
                heading: Cesium.Math.toRadians(348.4202942851978),
                pitch: Cesium.Math.toRadians(-89.74026687972041),
                roll: Cesium.Math.toRadians(0),
            },
            complete: function callback() {
                // 定位完成之后的回调函数
            },
        });

        // var demo = new Cesium.Viewer('cesiumContainer', {
        //     animation: true,
        //     shouldAnimate: true,
        // });
        // demo.dataSources.add(
        //     Cesium.CzmlDataSource.load('../../cesium/demo.czml')
        // );
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    margin: 0px;
    padding: 0px;
}
#cesiumContainer {
    font-size: 5.5vw;
    height: calc(100vh - 140px);
    overflow: hidden;
}
</style>
