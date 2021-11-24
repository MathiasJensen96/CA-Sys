package Fetcher;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dtos.FetchDTO;
import dtos.OurDTO;
import dtos.RestaurantDTO;
import utils.HttpUtils;

public class UrlFetcher {

    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();

    static class PingRestaurant implements Callable<RestaurantDTO> {
        String url;
        PingRestaurant(String url) {
            this.url = url;
        }
        @Override
        public RestaurantDTO call() throws Exception {
            String restaurantAPI = HttpUtils.fetchData(url);
            FetchDTO fetchDTO = gson.fromJson(restaurantAPI, FetchDTO.class);
            return fetchDTO.getData();
        }
    }

    public static OurDTO runParrallel() throws ExecutionException, InterruptedException {
        ExecutorService executor = Executors.newCachedThreadPool();
        List<String> urls = new ArrayList<>();
        urls.add("https://foodbukka.herokuapp.com/api/v1/restaurant/5f5eccf3e923d0aca3e7d41c");
        //urls.add("https://foodbukka.herokuapp.com/api/v1/menu/5f5eccf3e923d0aca3e7d41c");
        //urls.add("https://foodbukka.herokuapp.com/api/v1/restaurant/5f5eccf3e923d0aca3e7d41b");

        Future future = executor.submit(new PingRestaurant(urls.get(0)));
        //Future future1 = executor.submit(new PingRestaurant(urls.get(1)));

        OurDTO restaurants = new OurDTO((RestaurantDTO) future.get());
        System.out.println(future);
        System.out.println(restaurants.getId());
        return restaurants;
    }
}