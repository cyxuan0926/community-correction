import { URLConfig } from '@/services/urls'
import mergeWith from 'lodash/mergeWith'

const defaultMapConfig = {
    mapStyle: 'amap://styles/whitesmoke'
}

const defaultCircleConfig = {
    strokeColor: '#3366ff',
    strokeOpacity: 0.3,
    strokeWeight: 3,
    fillColor: '#ffa500',
    fillOpacity: 0.35,
}

const defaultInfowinConfig = {
    content: '窗体信息',
    anchor: 'bottom-center'
}

const defaultDisWorldConfig = {
    zIndex:10,
    styles:{
        'nation-stroke': function(props) {
            return props.type === 'Nation_Border_China' ? 'rgba(67,129,230, .5)' : 'white'
        },
        'coastline-stroke': 'white',
        'fill': '#f2f2f2'
    }
}

const defaultDisCountryConfig = {
    zIndex:11,
    SOC:'CHN',  
    depth:2,
    styles:{
        'nation-stroke':function(props) {
            return props.SOC === 'CHN' ? 'rgba(67,129,230,.5)' : 'white'
        },
        'coastline-stroke': 'white',
        'province-stroke':'rgba(67,129,230, .1)',
        'city-stroke': 'rgba(67,129,230, .1)',//中国特有字段,
        'fill': function(props) {
            return props.SOC === 'CHN' ? 'rgba(67,129,230, .1)' : 'gray'
        }
    }
}

const defaultDisProvinceConfig = {
    zIndex:12,
    depth:2,
    styles:{
        'province-stroke':'rgba(67,129,230,5)',
        'city-stroke': 'white',//中国地级市边界
        'county-stroke': 'rgba(255,255,255,0.5)',//中国区县边界  
        'fill': 'rgba(67,129,230, .5)'
    }
}

export default class AmapUtil {
    constructor() {
        this.AmapConstructor = null
        this.map = null
        this.infoWindow = null
        this.marks = []
        this.circles = []
        this.districtLayerWorld = null
        this.districtLayerCountry = null
        this.districtLayerProvince = null
        this.maxZoom = 12;
        this.currentZoom = 0;
        this.plugins = {}
    }

    static getMapInstance() {
        return new AmapUtil()
    }

    loadPlugin( plugins ) {
        return new Promise((resolve) => {
            plugins = (Array.isArray(plugins) ? plugins : [plugins]).map(p => p.startsWith('AMap.') ? p : 'AMap.' + p)
            this.AmapConstructor.plugin( plugins, () => {
                plugins.forEach(p => {
                    p = p.replace(/^AMap\./, '')
                    if( !this.plugins[p] ) {
                        this.plugins[p] = this.AmapConstructor[p]
                    }
                })
                resolve()
            } )
        })
    }

    getPluginInstance( name, config ) {
        const pluginConstructor = this.plugins[name]
        if( pluginConstructor ) {
            return new pluginConstructor(config)
        }
        return
    }

    setMap(constructor, config) {
        this.AmapConstructor = constructor
        let {id, ...mapConfig} = config
        this.map = new this.AmapConstructor.Map(id, mergeWith({}, defaultMapConfig, mapConfig))
        return this
    }

    loadMap(config) {
        return new Promise((resolve, reject) => {
            if ( window.AMap ) {
                resolve( this.setMap(window.AMap, config) )
            } else {
                let methodName = 'initAMpCallback' + ('' + Math.random() ).replace(/\D/g, '')
                window[methodName] = () => {
                    resolve( this.setMap(window.AMap, config) )
                    window[methodName] = null
                }
                let script = document.createElement('script')
                script.type = 'text/javascript'
                script.async = true
                script.src = `https://webapi.amap.com/maps?v=1.4.15&key=${URLConfig.mapKey}&callback=${methodName}`
                script.onerror = reject
                document.head.appendChild(script)
            }
        })
    }

    addMarks( marks ) {
        marks = Array.isArray(marks) ? marks : [marks]
        if( marks.length ) {
            this.marks = marks.map(m => {
                let { props, ...markConfig } = m
                let mk = new this.AmapConstructor.Marker(mergeWith({}, markConfig))
                return Object.assign(mk, props)
            })
            this.map.add( this.marks )
        }
        return this
    }

    addCircle( circles ) {
        circles = Array.isArray(circles) ? circles : [circles]
        this.circles = circles.map(c => new this.AmapConstructor.Circle( mergeWith({}, defaultCircleConfig, c) ))
        this.map.add( this.circles )
        return this
    }

    addInfoWindow( config ) {
        this.infoWindow = new this.AmapConstructor.InfoWindow( mergeWith({}, defaultInfowinConfig, config) )
        this.map.add( this.infoWindow )
        return this
    }

    addDistrictLayerWorld( config ) {
        this.districtLayerWorld = new this.AmapConstructor.DistrictLayer.World( mergeWith({}, defaultDisWorldConfig, config) )
        this.map.add( this.districtLayerWorld )
        return this
    }

    addDistrictLayerCountry( config ) {
        this.districtLayerCountry = new this.AmapConstructor.DistrictLayer.World( mergeWith({}, defaultDisCountryConfig, config) )
        this.map.add( this.districtLayerCountry )
        return this
    }

    addDistrictLayerProvince( config ) {
        this.districtLayerProvince = new this.AmapConstructor.DistrictLayer.Province( mergeWith({}, defaultDisProvinceConfig, config) )
        this.map.add( this.districtLayerProvince )
        return this
    }

    bindMarkEvent(type, handle) {
        if( this.marks && this.marks.length ) {
            this.marks.forEach(o => {
                o.on(type, handle)
            });
        }
        return this
    }

    bindMapEvent(type, handle) {
        if( this.map ) {
            this.map.on(type, handle)
        }
        return this
    }

    showDistrictLayer() {
        this.districtLayerWorld && this.districtLayerWorld.show()
        this.districtLayerCountry && this.districtLayerCountry.show()
        this.districtLayerProvince && this.districtLayerProvince.show()
        return this
    }

    hideDistrictLayer() {
        this.districtLayerWorld && this.districtLayerWorld.hide()
        this.districtLayerCountry && this.districtLayerCountry.hide()
        this.districtLayerProvince && this.districtLayerProvince.hide()
        return this
    }

    setCity(adcode = '中国') {
        this.map.setCity(adcode)
        return this
    }

    setFitView(overlays) {
        this.map.setFitView(overlays)
        return this
    }

    getLocation(address) {
        return new Promise((resolve, reject) => {
            let geocoder = this.getPluginInstance('Geocoder')
            if( geocoder ) {
                geocoder.getLocation(address, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        // result中对应详细地理坐标信息
                        resolve(result.geocodes)
                    }else {
                        reject()
                    }
                })
            }
        })
    }

    getOffset(x, y) {
        return new this.AmapConstructor.Pixel(x, y)
    }
}