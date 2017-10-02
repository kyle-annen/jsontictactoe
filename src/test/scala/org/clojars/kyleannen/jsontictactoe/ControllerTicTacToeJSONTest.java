package org.clojars.kyleannen.jsontictactoe;

import org.clojars.kyleannen.javaserver.ResponseParameters;
import org.clojars.kyleannen.javaserver.RequestParameters;
import org.junit.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ControllerTicTacToeJSONTest {

  @Test
  public void responseParamsContainsUpdatedBoardState() throws IOException {
    ArrayList<String> httpMessage = new ArrayList<>();
    httpMessage.add("PUT / HTTP/1.1\r\n");
    httpMessage.add("{ \"board\": \"1,2,3,4,5,6,7,8,9\",\"move\":\"1\"}\r\n\r\n");
    RequestParameters requestParameters =
            new RequestParameters
                    .RequestBuilder("/")
                    .setHttpVerb(httpMessage)
                    .setRequestPath(httpMessage)
                    .setBodyContent(httpMessage)
                    .build();
    ResponseParameters responseParameters =  new ControllerTicTacToeJSON().getResponse(requestParameters);
    assert(responseParameters.getBodyContent().contains("X,2,3"));

  }


}
