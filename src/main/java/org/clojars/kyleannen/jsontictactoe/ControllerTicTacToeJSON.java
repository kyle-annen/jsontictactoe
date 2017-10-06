package org.clojars.kyleannen.jsontictactoe;


import org.clojars.kyleannen.javaserver.ControllerInterface;
import org.clojars.kyleannen.javaserver.RequestParameters;
import org.clojars.kyleannen.javaserver.ResponseParameters;

import java.io.IOException;

public class ControllerTicTacToeJSON implements ControllerInterface{
  @Override
  public ResponseParameters getResponse(RequestParameters requestParameters) throws IOException {
    String responseJSON = IntegratorJSON.submitRound(requestParameters.bodyContent);

    return new ResponseParameters.ResponseBuilder(200)
            .setDate()
            .setContentType(".json")
            .setContentLength(responseJSON)
            .setContentDisposition(".html")
            .setBodyType(responseJSON)
            .setBodyContent(responseJSON)
            .setAccessControlAllowOrigin(requestParameters.host)
            .build();
  }
}
