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
                {/* 訂單資訊 */}
                <div className="row">
                    <div className="col-6">
                        <div className="card mb-3">
                        <div className='card-header'>訂單項目</div>
                            <div className='card-body'>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between border-bottom">
                                        <span className="text-muted">商品資訊</span>
                                        <span className="text-muted">商品數量</span>
                                        <span className="text-muted">小計</span>
                                    </li>
                                </ul>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex align-items-center justify-content-between border-bottom">
                                            <img
                                            src="src/assets/images/product/檸檬老醬蘿蔔.png"
                                            alt="商品圖片"
                                            className="product-img"
                                            />

                                            <div className="d-flex flex-column">
                                            <p className="mb-1 h6">檸檬老醬蘿蔔</p>
                                            <p className="mb-0">500ml 慢醃大罐</p>
                                            </div>

                                            <div className="d-flex align-items-center">1</div>
                                            <div className="d-flex align-items-center">NTD$500</div>
                                        </li>
                                    </ul>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex align-items-center justify-content-between">
                                            <img
                                            src="src/assets/images/product/煙燻蒜香小黃瓜.png"
                                            alt="商品圖片"
                                            className="product-img"
                                            />

                                            <div className="d-flex flex-column">
                                            <p className="mb-1 h6">煙燻蒜香小黃瓜</p>
                                            <p className="mb-0">200ml 慢醃迷你</p>
                                            </div>

                                            <div className="d-flex align-items-center">2</div>
                                            <div className="d-flex align-items-center">NTD$500</div>
                                        </li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card">
                        <div className="card-body">確認收件資訊</div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="card">
                        <div className="card-body">訂單總計</div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card">
                        <div className="card-body">確認付款資訊</div>
                        </div>
                    </div>
                </div>
            {/* 按鈕 */}
            <div className='d-flex justify-content-between row mt-3'>
                <button type="button" className="btn btn-outline-dark col-2">返回上一步</button>
                <button type="button" className="btn btn-dark col-6">送出訂單</button>
            </div>
        </div>
        </>
    )
}

export default OrderReview;