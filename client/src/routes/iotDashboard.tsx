import { useDispatch, useSelector } from "react-redux";
import AppBar from "../molecules/AppBar";
import { Lang } from "../langauges/Dictionary";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchAPI } from "../utils/FetchAPI";
import { FetchMethods } from "../interface/methods.enum";
import { setError } from "../store/reducers/errorReducer";

interface GateWayCreateInterface {
  name: string;
  password?: string;
  confirmedPassword?: string;
  description: string;
  creator?: string;
  createdAt?: any;
  _id?: string;
}

interface IHumidity {
  date: string;
  gw: string;
  humidity: number;
  __v: number;
  _id: number;
}

interface ITemperature {
  date: string;
  gw: string;
  temperature: number;
  __v: number;
  _id: number;
}

const StudentsDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((data: any) => {
    return data.auth;
  });
  const lang = useSelector((data: any) => {
    return data.language.language;
  });
  const [listOfGateways, setListOfGateways] = useState<
    GateWayCreateInterface[]
  >([]);
  const [gwID, setGwID] = useState<string>("");
  const [temperature, setTemperature] = useState<ITemperature[]>([]);
  const [humidity, setHumidity] = useState<IHumidity[]>([]);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllGateways = async () => {
    try {
      const data: GateWayCreateInterface[] = await fetchAPI(
        "/gateway/all/",
        FetchMethods.GET
      );
      console.log(data);
      setListOfGateways(data);
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("/");
    }
    getAllGateways();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const todayFunciton = (): Date => {
    let today = new Date();
    today.setDate(today.getDate());
    return today;
  };
  useEffect(() => {
    setEndDate(todayFunciton());
  }, []);

  const getDataFromGW = async (id: string, start: Date, end: Date) => {
    setIsLoading(true);
    try {
      const humidityData: IHumidity[] = await fetchAPI(
        "/gateway/data/humidity/",
        FetchMethods.POST,
        {
          id,
          startDate,
          endDate,
        }
      );
      const temperatureData: ITemperature[] = await fetchAPI(
        "/gateway/data/temperature/",
        FetchMethods.POST,
        {
          id,
          startDate,
          endDate,
        }
      );

      humidityData.forEach((h) => {
        if (h.humidity !== null) {
          const niceDate =
            new Date(h.date).toLocaleDateString() +
            " " +
            new Date(h.date).toLocaleTimeString();
          h.date = niceDate;
          console.log(h.humidity);
          h.humidity = parseFloat(h.humidity.toFixed(1));
        }
      });

      temperatureData.forEach((h: ITemperature) => {
        if (h.temperature !== null) {
          const niceDate =
            new Date(h.date).toLocaleDateString() +
            " " +
            new Date(h.date).toLocaleTimeString();
          h.date = niceDate;
          h.temperature = parseFloat(h.temperature.toFixed(1));
        }
      });

      setHumidity(humidityData);
      setTemperature(temperatureData);
      setIsLoading(false);
    } catch (error: any) {
      dispatch(setError(error.message));
      setIsLoading(false);
    }
  };
  return (
    <>
      {authState.isAuthenticated && (
        <div>
          <br />
          <AppBar />
          <h2 className="page-title">{Lang.dashboardTitle[lang]}</h2>
          <div className="dashborad-wrapper">
            <hr />
            <select
              onChange={(e: any) => {
                setGwID(e.target.value);
                getDataFromGW(e.target.value, startDate, endDate);
              }}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="---">---</option>
              {listOfGateways.map((gateway: GateWayCreateInterface, index) => (
                <option key={index} value={gateway._id}>
                  {gateway.name}
                </option>
              ))}
            </select>
          </div>
          <br />
          {isLoading && (
            <div>
              <p>Na????t??me pro v??s data... Mal?? moment...</p>
            </div>
          )}
          {!isLoading && (
            <>
              {temperature.length > 0 && (
                <div style={{ paddingBottom: 8 }}>
                  Aktu??ln?? teplota: &nbsp;
                  <span
                    style={{
                      backgroundColor: "hotpink",
                      color: "white",
                      padding: 2,
                    }}
                  >
                    {temperature[temperature.length - 2].temperature}??C
                  </span>
                </div>
              )}
              {gwID && (
                <div className="dateRange">
                  From:{" "}
                  <input
                    value={startDate.toISOString().substring(0, 10)}
                    type="date"
                    onChange={(e: any) => {
                      setStartDate(new Date(e.target.value));
                    }}
                    max={endDate.toISOString().substring(0, 10)}
                  />{" "}
                  To:{" "}
                  <input
                    value={endDate.toISOString().substring(0, 10)}
                    type="date"
                    onChange={(e: any) => {
                      setEndDate(new Date(e.target.value));
                    }}
                    max={todayFunciton().toISOString().substring(0, 10)}
                    min={startDate.toISOString().substring(0, 10)}
                  />
                  {"  "}
                  <span
                    onClick={() => {
                      getDataFromGW(gwID, startDate, endDate);
                    }}
                    style={{ marginRight: 10 }}
                    className="btn btn-primary"
                  >
                    zobrazit
                  </span>
                </div>
              )}

              <div className="gwData">
                <div style={{ width: "100%", marginTop: 20 }}>
                  {temperature.length > 0 && (
                    <>
                      <h3>Teplota</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart
                          width={500}
                          height={200}
                          data={temperature}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" style={{ fontSize: 8 }} />
                          <YAxis />
                          <Tooltip />
                          <Line
                            connectNulls
                            name="Teplota"
                            type="monotone"
                            dataKey="temperature"
                            stroke="#8884d8"
                            fill="#8884d8"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      <h3>Vlhkost</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart
                          width={500}
                          height={200}
                          data={humidity}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" style={{ fontSize: 8 }} />
                          <YAxis />
                          <Tooltip />
                          <Line
                            connectNulls
                            name="vlhkost"
                            type="monotone"
                            dataKey="humidity"
                            stroke="#8884d8"
                            fill="#8884d8"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default StudentsDashboard;
