import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetNewsQuery } from "../services/newsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return "Loading...";
  return (
    <div>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select_news"
              placeholder="Select New Category"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOptions={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase() >= 0)
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => {
                return <Option value={coin.name}>{coin.name}</Option>;
              })}
            </Select>
          </Col>
        )}
        {cryptoNews.value.map((news, i) => {
          return (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className="news-card">
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className="news-image-container">
                    <Title className="news-title" level={4}>
                      {news.name}
                    </Title>
                    <img
                      style={{ maxWidth: "200px", maxHeight: "100px" }}
                      src={news?.image?.thumbnail?.contentUrl || demoImage}
                      alt="news"
                    />
                  </div>
                  <p>
                    {news.description > 100
                      ? `${news.description.substring(0, 100)}...`
                      : news.description}
                  </p>
                  <div className="provider-container">
                    <div className="">
                      <Avatar
                        src={
                          news.provider[0]?.image?.thumbnail?.contentUrl ||
                          demoImage
                        }
                        alt="news"
                      />
                      <Text className="provider-name">
                        {news.provider[0]?.name}
                      </Text>
                    </div>
                    <Text>
                      {moment(news.datePublished).startOf("ss").fromNow()}
                    </Text>
                  </div>
                </a>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default News;
