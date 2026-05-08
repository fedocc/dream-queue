from __future__ import annotations

import json
from http.server import BaseHTTPRequestHandler, HTTPServer

from routes import attraction_statuses, simulation_summary


class Handler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        if self.path == "/api/attractions":
            self._json(attraction_statuses())
        elif self.path == "/api/simulation":
            self._json(simulation_summary())
        else:
            self._json({"service": "dream-queue-ai", "endpoints": ["/api/attractions", "/api/simulation"]})

    def _json(self, payload) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main() -> None:
    server = HTTPServer(("127.0.0.1", 8008), Handler)
    print("API running at http://127.0.0.1:8008")
    server.serve_forever()


if __name__ == "__main__":
    main()

