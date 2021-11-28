package Fetcher;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dtos.*;
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
            FetchRestaurantDTO fetchRestaurantDTO = gson.fromJson(restaurantAPI, FetchRestaurantDTO.class);
            return fetchRestaurantDTO.getData();
        }
    }

    static class PingMenu implements Callable<MenuDTO> {
        String url;
        PingMenu(String url) {
            this.url = url;
        }
        @Override
        public MenuDTO call() throws Exception {
            String menuAPI = HttpUtils.fetchData(url);
            FetchMenuDTO fetchMenuDTO = gson.fromJson(menuAPI, FetchMenuDTO.class);
            return fetchMenuDTO.getResult();
        }
    }

    public static List<OurRestaurantDTO> runParrallelRestaurants() throws ExecutionException, InterruptedException {
        ExecutorService executor = Executors.newCachedThreadPool();
        List<String> urls = new ArrayList<>();
        urls.add("https://foodbukka.herokuapp.com/api/v1/restaurant/5f5eccf3e923d0aca3e7d41c");
        urls.add("https://foodbukka.herokuapp.com/api/v1/restaurant/5f5eccf3e923d0aca3e7d41b");
        urls.add("https://foodbukka.herokuapp.com/api/v1/restaurant/5f5eccf3e923d0aca3e7d418");
        urls.add("https://foodbukka.herokuapp.com/api/v1/restaurant/5f5eccf3e923d0aca3e7d41e");

        ArrayList<OurRestaurantDTO> restaurants = new ArrayList<>();
        for (int i = 0; i < urls.size(); i++) {
            Future future = executor.submit(new PingRestaurant(urls.get(i)));
            restaurants.add(new OurRestaurantDTO((RestaurantDTO) future.get()));
        }
        return restaurants;
    }

    public static List<OurMenuDTO> runParrallelMenus() throws ExecutionException, InterruptedException {
        ExecutorService executor = Executors.newCachedThreadPool();
        List<String> urls = new ArrayList<>();
        urls.add("https://foodbukka.herokuapp.com/api/v1/menu/5f5eccf4e923d0aca3e7d447");
        urls.add("https://foodbukka.herokuapp.com/api/v1/menu/5f5eccf4e923d0aca3e7d44c");
        urls.add("https://foodbukka.herokuapp.com/api/v1/menu/5f5eccf4e923d0aca3e7d449");
        urls.add("https://foodbukka.herokuapp.com/api/v1/menu/5f5eccf4e923d0aca3e7d44a");

        ArrayList<OurMenuDTO> menus = new ArrayList<>();
        for (int i = 0; i < urls.size(); i++) {
            Future future = executor.submit(new PingMenu(urls.get(i)));
            menus.add(new OurMenuDTO((MenuDTO) future.get()));
        }
        return menus;
    }
}