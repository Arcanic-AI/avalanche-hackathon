import { EncryptionService } from './../encryption/encryption.service';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Web3 from 'web3';
import { Wallet } from './entities/wallet.entity';
import { read } from 'fs';


@Injectable()
export class WalletService {
  private web3: Web3;

  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    private encryptionService: EncryptionService
  ) {
    this.web3 = new Web3();
  }

  async verifySignature(privateKey: string, expectedAddress: string) {
    const formattedPrivateKey = privateKey.startsWith('0x') ? privateKey : '0x' + privateKey;
    const decrypt_private_key = this.encryptionService.encrypt(privateKey);
    const account = this.web3.eth.accounts.privateKeyToAccount(formattedPrivateKey);
    if (account.address.toLowerCase() === expectedAddress.toLowerCase()) {
      const check = await this.walletRepository.findOne({ where: { private_key: decrypt_private_key } });
      if (check) {
        throw new ConflictException("đã tồn tại")
      }
      const wallet = new Wallet();
      wallet.address = expectedAddress;
      wallet.private_key = decrypt_private_key;
      await this.walletRepository.save(wallet);
      return wallet;
    }else{
      throw new NotFoundException('xác thực thất bại')
    }
  }
  async savePrivateKey(private_key: string, address: string): Promise<Wallet> {
    const encrypt_password = this.encryptionService.encrypt(private_key);

    let wallet = await this.walletRepository.findOne({ where: { address } });
    if (!wallet) {
      wallet = this.walletRepository.create({ address, private_key: encrypt_password });
    } else {
      wallet.private_key = encrypt_password;
    }

    return this.walletRepository.save(wallet);
  }

  async findOne(address: string) {
    const wallet = await this.walletRepository.findOne({
      where: { address }
    });
    return wallet
  }

  async findAll(): Promise<Wallet[]> {
    const user = await this.walletRepository.find();
    return user
  }
}
