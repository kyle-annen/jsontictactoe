package org.clojars.kyleannen.jsontictactoe;

import org.clojars.kyleannen.javaserver.RequestParameters;
import org.clojars.kyleannen.javaserver.ResponseParameters;
import org.junit.Test;

import java.io.IOException;
import java.util.ArrayList;

public class JavaControllerTicTacToeWebTest {

  @Test
  public void getResponseReturnsResponseWithIndexPage() throws IOException {
    ArrayList<String> httpMessage = new ArrayList<>();
    httpMessage.add("GET / HTTP/1.1\r\n\r\n");
    RequestParameters requestParameters =
            new RequestParameters
                    .RequestBuilder("/")
                    .setHttpVerb(httpMessage)
                    .setRequestPath(httpMessage)
                    .build();
    ResponseParameters responseParameters = new ControllerTicTacToeWeb().getResponse(requestParameters);
    assert(responseParameters.getBodyContent().contains("index.html"));
    assert(responseParameters.getContentDisposition().contains("inline;"));
    assert(responseParameters.getBodyType().contains("text"));
  }
}
