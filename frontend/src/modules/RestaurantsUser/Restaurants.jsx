import React from 'react';
import {
  Card, Carousel, Rate, Skeleton, Divider, Table
} from 'antd';
import { useGetRestaurantsQuery} from '../../store/api';
import Meta from 'antd/lib/card/Meta';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function Restaurants() {
  const { isLoading, data } = useGetRestaurantsQuery();
  const rating =(id, value)=>{
    axios.post(`/restaurants/${id}/rate/${value}`).then(console.log("adfhb"));
  };
  console.log(data);
  const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

  const st={width:'300px', height:'200px', margin:'auto' }
  return (<Carousel>
      {data && data.map((item)=>{
        return <div>
          {isLoading ? <Skeleton loading={isLoading} >
          <Meta title="Card title" description="This is the description" style={st}/>
        </Skeleton> : <Card hoverable
            //onClick={}
            cover={<img alt="rest" src="restaurant.jpeg" style={st}/>}
            style={{ margin:0, padding:20, color: '#fff', textAlign: 'center', background: '#111d2c',}} >
              <div style={{textAlign: 'center', border: '2px solid white', backgroundColor:'white'}}>
                <div style={{color: '#111d2c', fontWeight: 'bold', fontSize:30}}>
                   {item.name}
                </div>
                <div style={{color: "#164c7e", textAlign:'right'}}>
                   {item.phone}
                   <Divider orientation="right" plain style={{margin:0}}/>
                   <Rate value={item.rate} character={({index})=>customIcons[index+1]} 
                    onClick={rating(item._id, 4)}
                   ></Rate>
                </div>
                <Table dataSource={item?.menu} pagination={false}>
                  <Table.Column title="Название блюда" dataIndex="name" key="name"/>
                  <Table.Column title="Состав" dataIndex="compound" key="compound"/>
                  <Table.Column title="Цена" dataIndex="price" key="price" />
                </Table>
                </div>
          </Card>}
        </div>
      })}
    </Carousel>
  );
}
