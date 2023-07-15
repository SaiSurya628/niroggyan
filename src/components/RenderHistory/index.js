import History from "../History";

const RenderHistory = () => {
  const forFunction = () => {
    const historyComponents = [];
    for (let i = 10; i < localStorage.length + 10; i++) {
      const storageData = JSON.parse(localStorage.getItem(`history-${i}`));
      if (storageData && storageData.historyId) {
        const { historyId } = storageData;
        console.log(historyId);
        historyComponents.push(<History key={i} id={historyId} />);
      }
    }
    return historyComponents;
  };

  return <>{forFunction()}</>;
};

export default RenderHistory;
