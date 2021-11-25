package dtos;

public class FetchMenuDTO {

    private MenuDTO Result;

    public FetchMenuDTO() {
    }

    public FetchMenuDTO(MenuDTO result) {
        Result = result;
    }

    public MenuDTO getResult() {
        return Result;
    }

    public void setResult(MenuDTO result) {
        Result = result;
    }
}
