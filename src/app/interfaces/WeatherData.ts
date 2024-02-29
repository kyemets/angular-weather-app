interface CurrentData {
    time: string
    interval: number
    relative_humidity_2m: number[]
}

export interface WeatherData {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    current: CurrentData
    hourly_units: {
        time: string
        temperature_2m: string
    }
    hourly: {
        time: string[]
        temperature_2m: number[]
        weather_state: string[]
        surface_pressure: number[]
        relative_humidity: number[]
    }
}
