<template>
    <div>
        <div id="cesiumContainer"></div>
    </div>
</template>

<script>
import * as Cesium from 'cesium';
// import cesiumContainer from './MyMap.vue';
// components: {
//     cesiumContainer;
// }
export default {
    data() {
        return {
            viewer: '',
            handler: '',
        };
    },
    methods: {},

    mounted() {
        var cesiumAsset =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZjIzNjBjYS1kMzg2LTQxNTUtYWI1My0zZWQxZDk0NjllMTgiLCJpZCI6NzkwMjIsImlhdCI6MTY0MTc4NjU5NX0.J8vmyth6-prCGWAk9KP7Muoi7oTgvaj_JFJqnAwHwnk';
        var tiandituTk = '796dc555444aa1a10e9859a43422c316';
        // 服务负载子域
        var subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];
        Cesium.Ion.defaultAccessToken = cesiumAsset;

        this.viewer = new Cesium.Viewer('cesiumContainer', {
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
        var viewer = this.viewer;
        var iframe = document.getElementsByClassName(
            'cesium-infoBox-iframe'
        )[0];
        iframe.setAttribute(
            'sandbox',
            'allow-same-origin allow-scripts allow-popups allow-forms'
        );
        var that = this;
        this.handler = new Cesium.ScreenSpaceEventHandler(
            this.viewer.scene.canvas
        );
        this.handler.setInputAction(function (click) {
            var click_position = viewer.camera.pickEllipsoid(click.position);
            var carto_position =
                Cesium.Cartographic.fromCartesian(click_position);
            var longitude_x = Cesium.Math.toDegrees(
                carto_position.longitude
            ).toFixed(3);
            var longitude_y = Cesium.Math.toDegrees(
                carto_position.latitude
            ).toFixed(3);
            var Longitude = longitude_x + '经度，' + longitude_y + '纬度';
            that.$message.success('点击坐标的位置为: ' + Longitude);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        this.viewer._cesiumWidget._creditContainer.style.display = 'none'; // 隐藏cesium ion
        this.viewer.imageryLayers.addImageryProvider(
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
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(102.29, 27.444, 40000),
            orientation: {
                heading: Cesium.Math.toRadians(348.4202942851978),
                pitch: Cesium.Math.toRadians(-89.74026687972041),
                roll: Cesium.Math.toRadians(0),
            },
            complete: function callback() {
                // 定位完成之后的回调函数
            },
        });

        var staticPosition = Cesium.Cartesian3.fromDegrees(
            -75.59742934002912,
            40.03824624260394,
            8
        );
        var entity44 = this.viewer.entities.add({
            position: staticPosition,
        });
        function computeModelMatrix(entity, time) {
            var position = Cesium.Property.getValueOrUndefined(
                entity.position,
                time
            );
            let modelMatrix =
                Cesium.Transforms.eastNorthUpToFixedFrame(position);
            return modelMatrix;
        }
        function computeEmitterModelMatrix() {
            let hpr = Cesium.HeadingPitchRoll.fromDegrees(0, 0, 0);
            let trs = new Cesium.TranslationRotationScale();
            trs.translation = Cesium.Cartesian3.fromElements(2.5, 4, 1);
            trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr);
            let result = Cesium.Matrix4.fromTranslationRotationScale(trs);
            return result;
        }
        this.viewer.scene.primitives.add(
            new Cesium.ParticleSystem({
                // image: require('../../assets/fonts/cesium.png'),
                startColor: Cesium.Color.RED.withAlpha(0.7),
                endColor: Cesium.Color.YELLOW.withAlpha(0.3),
                startScale: 0,
                endScale: 10,
                minimumParticleLife: 1,
                maximumParticleLife: 6,
                minimumSpeed: 1,
                maximumSpeed: 4,
                imageSize: new Cesium.Cartesian2(5, 5),
                emissionRate: 4, //每秒要发射的粒子数
                lifetime: 160.0, //粒子系统发射粒子的时间（以秒为单位）
                emitter: new Cesium.CircleEmitter(5.0),
                modelMatrix: computeModelMatrix(
                    entity44,
                    Cesium.JulianDate.now()
                ),
                emitterModelMatrix: computeEmitterModelMatrix(),
            })
        );
    },
};
</script>

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
