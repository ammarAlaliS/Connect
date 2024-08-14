let requestCount = 0;

export const incrementRequestCount = () => {
    requestCount += 1;
    console.log(`Número de solicitudes realizadas: ${requestCount}`);
};

export const getRequestCount = () => requestCount;