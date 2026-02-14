import './OrderReview.css';
//確認訂單頁
function OrderReview() {
    return(
        <>
        <div className="container">
            <h1 className="text-center mt-80">購物車</h1>
                {/* 訂單進度 */} {/*需調整：更改部分圖片，增加箭頭*/}
                <div className="mt-64 mb-64 d-flex justify-content-evenly">
                    <div className="step">
                        <img src="/src/assets/images/Vector-green.svg" alt="" className='mb-2'/>
                        <span className="step-number text-white h4"><i class="bi bi-check"></i></span>
                        <p>加入商品</p>
                    </div>
                    <div className="step">
                        <img src="/src/assets/images/Vector-green.svg" alt="" className='mb-2'/>
                        <span className="step-number text-white h4"><i class="bi bi-check"></i></span>
                        <p>填寫訂單</p>
                    </div>
                    <div className="step">
                        <img src="/src/assets/images/Vector-green.svg" alt="" className='mb-2'/>
                        <span className="step-number text-white h4">03</span>
                        <p>確認訂單</p>
                    </div>
                    <div className="step">
                        <img src="/src/assets/images/Vector-green.svg" alt="" className='mb-2'/>
                        <span className="step-number text-white h4">04</span>
                        <p>完成訂購</p>
                    </div>
                </div>
                {/* 訂單項目 + 收件資訊 */}
                <div className="row g-4">
                {/* 訂單項目 */}
                <div className="col-12 col-md-6">
                    <div className="card mb-3">
                    <div className="card-header">訂單項目</div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush mb-2">
                        <li className="list-group-item d-flex justify-content-between border-bottom">
                            <span className="text-muted">商品資訊</span>
                            <span className="text-muted">商品數量</span>
                            <span className="text-muted">小計</span>
                        </li>
                        </ul>
                        {/* 商品列表 */}
                        {[
                        { img: "檸檬老醬蘿蔔.png", title: "檸檬老醬蘿蔔", desc: "500ml 慢醃大罐", qty: 1, price: 500 },
                        { img: "煙燻蒜香小黃瓜.png", title: "煙燻蒜香小黃瓜", desc: "200ml 慢醃迷你", qty: 2, price: 500 },
                        ].map((item, idx) => (
                        <ul className="list-group list-group-flush mb-2" key={idx}>
                            <li className="list-group-item d-flex align-items-center justify-content-between">
                            <img src={`src/assets/images/product/${item.img}`} alt={item.title} className="product-img" />
                            <div className="d-flex flex-column ms-1">
                                <p className="mb-1 h6">{item.title}</p>
                                <p className="mb-0">{item.desc}</p>
                            </div>
                            <div className="d-flex align-items-center">{item.qty}</div>
                            <div className="d-flex align-items-center">NTD${item.price}</div>
                            </li>
                        </ul>
                        ))}
                    </div>
                    </div>
                </div>

                {/* 收件資訊 */}
                <div className="col-12 col-md-6">
                    <div className="card mb-3">
                    <div className="card-header">確認收件資訊</div>
                    <div className="card-body">
                        {[
                        ["收件者姓名", "王小明"],
                        ["手機號碼", "0912345678"],
                        ["電子郵件", "yenmade@gmail.com"],
                        ["收貨地址", "高雄市鹽埕區七賢三路123號2樓"],
                        ["發票類型", "列印發票"],
                        ["備註", "可以直接管理室代收，早上9點到晚上10點都有人員在，謝謝。"],
                        ].map(([label, value], idx) => (
                        <div className="row align-items-center mb-2" key={idx}>
                            <p className="col-4">{label}</p>
                            <p className="col-8">{value}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>

                {/* 訂單總計 + 付款資訊 */}
                <div className="row g-4 mt-3">
                {/* 訂單總計 */}
                <div className="col-12 col-md-6">
                    <div className="card mb-3">
                    <div className="card-header">訂單總計</div>
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-2">
                        <p>商品總金額</p>
                        <p>NTD$1,000</p>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                        <div>運費</div>
                        <i className="bi bi-info-circle ms-1"></i>
                        <div className="ms-auto">NTD$300</div>
                        </div>
                        <div className="d-flex justify-content-between border-bottom mb-2">
                        <p>優惠卷折扣</p>
                        <p>-NTD$300</p>
                        </div>
                        <div className="d-flex justify-content-between">
                        <p className="h6">應付金額</p>
                        <p className="h6">NTD$1,000</p>
                        </div>
                    </div>
                    </div>
                </div>

                {/* 付款資訊 */}
                <div className="col-12 col-md-6">
                    <div className="card mb-3">
                    <div className="card-header">確認付款資訊</div>
                    <div className="card-body">
                        <div className="row align-items-center mb-2">
                        <p className="col-4">付款方式</p>
                        <p className="col-8">信用卡</p>
                        </div>
                        <div className="row align-items-center mb-2">
                        <p className="col-4">卡號</p>
                        <div className="col-8 d-flex align-items-center">
                            <img src="#" alt="#" className="me-2" />
                            <p className="mb-0">**** 1212</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* 按鈕 */}
            <div className="row mt-5 mb-5 gx-1 justify-content-between"> 
                <div className="col-12 col-md-2 px-1 mb-3">
                    <button type="button" className="btn btn-outline-dark w-100">返回上一步</button>
                </div>
                <div className="col-12 col-md-6 px-1">
                    <button type="button" className="btn btn-dark w-100">NTD$1,000 - 送出訂單</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default OrderReview;