const fetchFeatures = async () => {
    if (!fetchFeaturesTrigger) return;

    console.log("About to fetch all features");


    try {
        const allSongFeatures = await Promise.all(
            songsArray.map(async (item, i) => {
                const { name: title, artists } = item.track;
                const artist = artists[0].name;
                const query = encodeURIComponent(`${artist}-${title}`);
                const url = `${base}?${param}=${query}`;

                // while (true) { // Limit retries to avoid infinite loops
                    try {
                        const response = await fetch(url);

                        while(!response.ok) {
                            if (response.status === 429) {
                                console.log(`Request restricted. Retrying after ${retryCount} seconds`);
                                await new Promise((resolve) => setTimeout(resolve, retryCount * 1000));
                                retryCount++;
                                continue;
                            } else {
                                throw new Error(`Error fetching data: ${response.status}`);
                            }
                        }

                        const featureData = await response.json();
                        setProgress((prev) => prev + 1); // Update progress
                        return featureData;
                    } catch (err) {
                        console.error(`Error fetching data for song ${title} by ${artist}`, err);
                        throw err;
                    }
                // } //while loop end

                // throw new Error(`Max retries reached for song ${title} by ${artist}`);
            })
        );

        setSongsWithFeatures(allSongFeatures); // Update state with fetched data
        console.log("Done fetching features");
    } catch (err) {
        console.error("Error fetching features for songs", err);
        // setError(err.message);
    } finally {
        setFetchFeaturesTrigger(false); // Reset trigger
        // setLoading(false); // End loading
    }
};

useEffect(() => {
    fetchFeatures();
}, [fetchFeaturesTrigger, songsArray]); // Dependencies