export const contador = () => {
  const [count, setCount] = Fugaz.useState(1);
  const [data, setData] = Fugaz.useState([]);
  const [esMayorQueCinco, setesMayorQueCinco] = Fugaz.useState("Nada");
  const [cambiado, setCambiado] = Fugaz.useState(false);
  const [cargado, setCargado] = Fugaz.useState(false);

  const handlerIncrementar = (e) => {
    setCount(count + 1);
  };

  Fugaz.addHandler("click", "increaseCount", handlerIncrementar);

  Fugaz.useEffect(() => {
    const esMayor = () => {
      setesMayorQueCinco(count % 2 == 0 ? "Yes" : "NO");
      setCambiado(count % 2 == 0);
      setCargado(count % 2 == 0);
    };

    const obtenerApi = async () => {
      if (!cargado) {
        var myHeaders = new Headers();
        myHeaders.append(
          "Cookie",
          "__cfduid=da38b62f79dbd2479c15f979db5049c0d1615308504"
        );

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const _response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${count}`,
          requestOptions
        );

        const _data = await _response.json();
        const { results } = _data;
        setData(results);
        setCargado(true);
      }
    };

    obtenerApi();

    esMayor();
  }, [count]);

  const obtenerSeccion = () => {
    let template = document.querySelector("#plantilla").textContent;

    return Mustache.render(template, {
      registros: [
        {
          count,
          esMayorQueCinco,
          lista: data,
        },
      ],
    });
  };

  return obtenerSeccion();
};
