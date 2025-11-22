#数据库操作的辅助函数  "创建新实体，查询数据等 如何在数据库新建记录，基本的crud操作"

from sqlalchemy.orm import Session
from datetime import datetime,timedelta
#引入当前目录下的全部模型
from . import models

# 获取指定用户的挑战配额信息
def get_challenge_quota(db: Session, user_id: str):
    # 查询数据库中与 user_id 匹配的 ChallengeQuota 记录
    return (db.query(models.ChallengeQuota)  # 查询 ChallengeQuota 表
            .filter(models.ChallengeQuota.user_id == user_id)  # 根据用户 ID 过滤
            .first())  # 返回查询到的第一条记录（如果存在），否则返回 None

# 创建一个新的挑战配额记录
def create_challenge_quota(db: Session, user_id: str):
    # 创建一个新的 ChallengeQuota 实例，并将 user_id 作为参数
    db_quota = models.ChallengeQuota(user_id=user_id)
    # 将新的配额对象添加到会话中
    db.add(db_quota)
    # 提交事务，将对象保存到数据库中
    db.commit()
    # 刷新对象，以便在提交后获取最新的数据库值
    db.refresh(db_quota)
    # 返回创建的配额对象
    return db_quota

# 如果需要，重置用户的挑战配额
def reset_quota_if_needed(db: Session, quota: models.ChallengeQuota):
    # 获取当前的时间
    now_time = datetime.now()
    # 检查上次重置时间与当前时间的差值是否超过 24 小时
    if now_time - quota.last_reasert_date > timedelta(hours=24):
        # 如果超过 24 小时，重置配额为 10
        quota.quota_remaining = 10
        # 更新最后重置时间为当前时间
        quota.last_reasert_date = now_time
        # 提交事务，保存更新的配额信息
        db.commit()
        # 刷新对象，以确保获取数据库中最新的配额数据
        db.refresh(quota)
    # 返回更新后的配额对象
    return quota
