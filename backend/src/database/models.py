#数据模型
from sqlalchemy import Column,Integer,DateTime,create_engine,String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

engine=create_engine('sqlite:///database.db',echo=True)

Base=declarative_base()

# 定义 Challenge 类，继承自 SQLAlchemy 的 Base 类
class Challenge(Base):
    # 指定数据库表名为 'challenges'
    __tablename__ = 'challenges'
    # 定义 'id' 字段，作为主键，数据类型为整数
    id = Column(Integer, primary_key=True)
    # 定义 'difficulty' 字段，用于存储挑战的难度等级，数据类型为字符串，不能为空
    difficulty = Column(String, nullable=False)
    # 定义 'date_created' 字段，用于记录挑战创建的时间，数据类型为日期时间，默认值为当前时间
    date_created = Column(DateTime, default=datetime.now)
    # 定义 'created_by' 字段，记录挑战的创建者，数据类型为字符串，不能为空
    created_by = Column(String, nullable=False)
    # 定义 'title' 字段，存储挑战的标题，数据类型为字符串，不能为空
    title = Column(String, nullable=False)
    # 定义 'options' 字段，存储挑战的选项，数据类型为字符串，不能为空
    options = Column(String, nullable=False)
    # 定义 'correct_answer_id' 字段，存储正确答案的 ID，数据类型为整数，不能为空
    correct_answer_id = Column(Integer, nullable=False)
    # 定义 'explanation' 字段，存储对正确答案的解释，数据类型为字符串，不能为空
    explanation = Column(String, nullable=False)


class ChallengeQuota(Base):
    __tablename__='challenge_quotas'

    id=Column(Integer,primary_key=True)
    #用户id
    user_id=Column(String,nullable=False,unique=True) #每个id只能出现一次
    #剩余产生挑战的次数
    quota_remaining=Column(Integer,nullable=False,default=50)
    #最新一次重置的时间
    last_reasert_date=Column(DateTime,default=datetime.now)

#将数据模型创建为对应的数据表
Base.metadata.create_all(engine)
# 创建一个会话工厂，用于生成与数据库交互的会话实例
SessionLocal = sessionmaker(autoflush=False, autoflush=False, bind=engine)


# 创建一个数据库会话生成器函数，供依赖注入使用
def get_db():
    # 创建一个新的数据库会话
    db = SessionLocal()
    try:
        # 返回会话对象供使用
        yield db
    finally:
        # 在操作完成后关闭会话，确保资源被释放
        db.close()


