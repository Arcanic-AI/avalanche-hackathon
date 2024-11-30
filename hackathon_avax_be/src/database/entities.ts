import { Wallet } from "src/auth/entities/wallet.entity";
import { WalletModule } from "src/auth/wallet.module";
import { Cat } from "src/cat/entities/cat.entity";
import { ArticleModule } from "src/article/article.module";
import { Article } from "src/article/entities/article.entity";
import { AiEvaluation } from "src/ai-evaluation/entities/ai-evaluation.entity";
import { Transaction_history } from "src/avax-transaction/entities/history.entity";
import { Predictions } from "src/avax-transaction/entities/predictions.entity";

export const entities = [
    Cat,
    Wallet,
    Article,
    AiEvaluation,
    Transaction_history,
    Predictions
]

export const Appmodule = [
    Cat,
    ArticleModule,
    WalletModule
]